import {ListManager, updateParagraph} from "./utils"
import {getLog} from "../translationLog"

type SortedParagraphs =
  | {
      type: "standard"
      paragraphs: Word.Paragraph[]
    }
  | {
      type: "table"
      ooxml: OfficeExtension.ClientResult<string>
    }
  | {
      type: "image"
      ooxml: OfficeExtension.ClientResult<string>
    }

function exhaustedCheck(_: never) {}

async function getSortedParagraphs(
  context: Word.RequestContext,
  paragraphs: Word.Paragraph[],
): Promise<SortedParagraphs[]> {
  function getParagraphType(para: Word.Paragraph): "table" | "standard" | "image" {
    if (para.parentTableOrNullObject.isNullObject) {
      return "standard"
    }
    if (para.inlinePictures.items.length > 0) {
      return "image"
    }
    return "table"
  }

  async function addNewParagraph(paragraphType: "standard" | "table" | "image", paragraph: Word.Paragraph) {
    if (paragraphType === "standard") {
      sortedParagraphs.push({paragraphs: [paragraph], type: "standard"})
    } else if (paragraphType === "image") {
      const ooxml = paragraph.parentTableOrNullObject.getRange().getOoxml()
      await context.sync()
      sortedParagraphs.push({ooxml, type: "image"})
    } else {
      const ooxml = paragraph.parentTableOrNullObject.getRange().getOoxml()
      await context.sync()
      sortedParagraphs.push({ooxml, type: "table"})
    }
  }

  const sortedParagraphs: SortedParagraphs[] = []
  for (const paragraph of paragraphs) {
    const paragraphType = getParagraphType(paragraph)
    if (sortedParagraphs.length === 0) {
      await addNewParagraph(paragraphType, paragraph)
      continue
    }
    const lastSortedParagraph = sortedParagraphs[sortedParagraphs.length - 1]
    if (paragraphType === "table") {
      if (lastSortedParagraph.type !== "table") {
        await addNewParagraph(paragraphType, paragraph)
      }
    } else if (paragraphType === "image") {
      if (lastSortedParagraph.type !== "image") {
        await addNewParagraph(paragraphType, paragraph)
      }
    } else if (paragraphType === "standard") {
      if (lastSortedParagraph.type !== "standard") {
        await addNewParagraph(paragraphType, paragraph)
      } else {
        lastSortedParagraph.paragraphs.push(paragraph)
      }
    } else {
      exhaustedCheck(paragraphType)
    }
  }
  return sortedParagraphs
}

async function addTwoColumnTable(
  context: Word.RequestContext,
  selection: Word.Range,
  paragraphs: Word.Paragraph[],
): Promise<Word.Range> {
  // Create a table with the required number of rows and 2 columns within the selected range
  // insert location before such that we avoid the trailing list problem
  const table = selection.insertTable(paragraphs.length, 2, Word.InsertLocation.after, [])
  table.load("rows/cells/body/paragraphs/items")
  await context.sync()

  const leftListManager = new ListManager(context, {logOnListChange: true})
  const rightListManager = new ListManager(context)
  // Iterate through the non-empty paragraphs and set each cell's value
  for (let i = 0; i < paragraphs.length; i++) {
    const cellLeft = table.rows.items[i].cells.items[0]
    const cellRight = table.rows.items[i].cells.items[1]
    const originalParagraph = paragraphs[i]
    const paragraphLeft = cellLeft.body.paragraphs.getFirst()
    const paragraphRight = cellRight.body.paragraphs.getFirst()
    updateParagraph(paragraphLeft, originalParagraph, originalParagraph.text.trim())
    updateParagraph(paragraphRight, originalParagraph, originalParagraph.text.trim())
    await leftListManager.updateLists(originalParagraph, paragraphLeft)
    await rightListManager.updateLists(originalParagraph, paragraphRight)
  }

  const range = table.getRange("Whole")
  await context.sync()
  return range
}

function addEmptyParagraphAtEndOfRange(range: Word.Range) {
  const paragraph = range.insertParagraph(" ", Word.InsertLocation.after)
  const newRange = paragraph.getRange("Whole")
  return {paragraph, range: newRange}
}

async function detachFromListIfPossible(context: Word.RequestContext, paragraph: Word.Paragraph) {
  try {
    paragraph.detachFromList()
    await context.sync()
  } catch (e) {
    // nothing to do here
  }
}

export async function createTableFromSelection(context: Word.RequestContext, selection: Word.Range) {
  selection.load("paragraphs,inlinePictures/items")
  await context.sync()
  selection.paragraphs.load(
    "font,style,text,listOrNullObject/id,listOrNullObject/levelTypes,parentTableOrNullObject,listItemOrNullObject/level,inlinePictures/items",
  )
  await context.sync()

  if (selection.inlinePictures.items.length > 0) {
    getLog().addMessage("image found")
  }

  const nonEmptyParagraphs = selection.paragraphs.items.filter(p => p.text.trim() !== "")

  const sortedParagraphs = await getSortedParagraphs(context, nonEmptyParagraphs)

  selection.clear()
  await context.sync()

  if (nonEmptyParagraphs.length === 0) {
    console.log("No non-empty paragraphs found in the selection.")
    return
  }

  const {paragraph: cleanupParagraph, range: _range} = addEmptyParagraphAtEndOfRange(selection)
  let range = _range
  await context.sync()

  await detachFromListIfPossible(context, cleanupParagraph)

  for (const sortedParagraph of sortedParagraphs) {
    if (sortedParagraph.type === "standard") {
      range = await addTwoColumnTable(context, range, sortedParagraph.paragraphs)
    }
    if (sortedParagraph.type === "table") {
      const p1 = addEmptyParagraphAtEndOfRange(range)
      range = p1.range
      range = range.insertOoxml(sortedParagraph.ooxml.value, Word.InsertLocation.after)
      const p2 = addEmptyParagraphAtEndOfRange(range)
      range = p2.range
      getLog().addMessage("table found")
      await context.sync()
    }
    if (sortedParagraph.type === "image") {
      const p1 = addEmptyParagraphAtEndOfRange(range)
      range = p1.range
      range = range.insertOoxml(sortedParagraph.ooxml.value, Word.InsertLocation.after)
      const p2 = addEmptyParagraphAtEndOfRange(range)
      range = p2.range
      getLog().addMessage("image found")
      await context.sync()
    }
  }

  cleanupParagraph.delete()

  await context.sync()
}
