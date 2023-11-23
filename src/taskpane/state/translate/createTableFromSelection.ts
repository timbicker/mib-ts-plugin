import {ListManager, updateParagraph} from "./utils"

type SortedParagraphs = {
  paragraphs: Word.Paragraph[]
  type: "table" | "standard"
}

function getSortedParagraphs(paragraphs: Word.Paragraph[]): SortedParagraphs[] {
  function getParagraphType(para: Word.Paragraph): "table" | "standard" {
    if (para.parentTableOrNullObject.isNullObject) {
      return "standard"
    }
    return "table"
  }

  const sortedParagraphs: SortedParagraphs[] = []
  for (const paragraph of paragraphs) {
    if (sortedParagraphs.length === 0) {
      sortedParagraphs.push({paragraphs: [paragraph], type: getParagraphType(paragraph)})
      continue
    }
    const lastSortedParagraph = sortedParagraphs[sortedParagraphs.length - 1]
    const paragraphType = getParagraphType(paragraph)
    if (lastSortedParagraph.type === paragraphType) {
      lastSortedParagraph.paragraphs.push(paragraph)
    } else {
      sortedParagraphs.push({paragraphs: [paragraph], type: paragraphType})
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

  const rightListManager = new ListManager(context)
  const leftListManager = new ListManager(context)
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

function addCleanupParagraph(range: Word.Range) {
  return range.insertParagraph(" ", Word.InsertLocation.after)
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
  selection.load("paragraphs")
  await context.sync()
  selection.paragraphs.load(
    "font,style,text,listOrNullObject/id,listOrNullObject/levelTypes,parentTableOrNullObject",
  )
  await context.sync()

  const nonEmptyParagraphs = selection.paragraphs.items.filter(p => p.text.trim() !== "")

  selection.clear()
  await context.sync()

  if (nonEmptyParagraphs.length === 0) {
    console.log("No non-empty paragraphs found in the selection.")
    return
  }

  const cleanupParagraph = addCleanupParagraph(selection)
  let range = cleanupParagraph.getRange("Whole")
  await context.sync()

  await detachFromListIfPossible(context, cleanupParagraph)

  const sortedParagraphs = getSortedParagraphs(nonEmptyParagraphs)
  for (const sortedParagraph of sortedParagraphs) {
    if (sortedParagraph.type === "standard") {
      range = await addTwoColumnTable(context, range, sortedParagraph.paragraphs)
    }
  }

  cleanupParagraph.delete()

  await context.sync()
}
