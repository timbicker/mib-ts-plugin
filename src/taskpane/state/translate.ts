class ListManager {
  originalList: Word.List | undefined = undefined
  newList: Word.List | undefined = undefined

  constructor(private context: Word.RequestContext) {}

  private clearLists() {
    this.originalList = undefined
    this.newList = undefined
  }

  private async setLists(oldParagraph: Word.Paragraph, newParagraph: Word.Paragraph) {
    this.originalList = oldParagraph.listOrNullObject
    this.newList = newParagraph.startNewList()
    this.newList.load("id")
    await this.context.sync()
  }

  private setLevelType(newList: Word.List, levelTypes: Word.ListLevelType, level: number) {
    if (levelTypes === Word.ListLevelType.bullet) {
      newList.setLevelBullet(level, Word.ListBullet.solid)
    } else {
      newList.setLevelNumbering(level, "Arabic", [level, "."])
    }
  }

  private copyListProperties(originalList: Word.List, newList: Word.List) {
    // Retrieve the list levels and their properties
    const levelTypes = originalList.levelTypes
    this.setLevelType(newList, levelTypes[0], 0)
    this.setLevelType(newList, levelTypes[1], 1)
  }

  async updateLists(originalParagraph: Word.Paragraph, newParagraph: Word.Paragraph) {
    if (originalParagraph.listOrNullObject.isNullObject) {
      this.clearLists()
      return
    }
    if (this.originalList === undefined || this.originalList.id !== originalParagraph.listOrNullObject.id) {
      await this.setLists(originalParagraph, newParagraph)
      this.copyListProperties(this.originalList, this.newList)
    } else {
      newParagraph.attachToList(this.newList.id, 0)
    }
  }
}

function updateParagraph(newParagraph: Word.Paragraph, originalParagraph: Word.Paragraph, text: string) {
  newParagraph.insertText(text, "Replace")
  newParagraph.font.set({
    bold: originalParagraph.font.bold,
    italic: originalParagraph.font.italic,
    name: originalParagraph.font.name,
    size: originalParagraph.font.size,
  })
}

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
  const cleanupParagraph = range.insertParagraph(" ", Word.InsertLocation.after)
  cleanupParagraph.detachFromList()
  return cleanupParagraph
}

async function createTableFromSelection(context: Word.RequestContext, selection: Word.Range) {
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

  const sortedParagraphs = getSortedParagraphs(nonEmptyParagraphs)
  for (const sortedParagraph of sortedParagraphs) {
    if (sortedParagraph.type === "standard") {
      range = await addTwoColumnTable(context, range, sortedParagraph.paragraphs)
    }
  }

  cleanupParagraph.delete()

  await context.sync()
}

async function updateRightCell(context: Word.RequestContext, selection: Word.Range, table: Word.Table) {
  table.load("rows/cells/items")
  await context.sync()

  // Check if table has two columns
  const columnsCount = table.rows.items[0].cells.items.length
  if (columnsCount !== 2) {
    throw new Error("The table does not have two columns.")
  }

  // Determine which cell the selection is in
  selection.load("parentTableCellOrNullObject")
  await context.sync()
  const cell = selection.parentTableCellOrNullObject

  if (cell.isNullObject) {
    throw new Error("Could not determine the cell.")
  }

  cell.load("cellIndex")
  await context.sync()

  if (cell.cellIndex === 1) {
    throw new Error("The selection is in the right cell.")
  }

  const content = cell.body.getRange("Whole")
  content.load("text")
  await context.sync()
  const text = content.text

  // delete content of right cell
  const rightCell = cell.getNextOrNullObject()
  rightCell.body.clear()
  rightCell.body.insertText(text.trim(), "End")
  await context.sync()
}

async function processStandard(context: Word.RequestContext) {
  // Get the selected range
  const selection = context.document.getSelection()
  // Load parentTable property to determine if the selection is inside a table
  selection.load("parentTableOrNullObject")
  await context.sync()

  const tableOrNullObject = selection.parentTableOrNullObject

  if (tableOrNullObject.isNullObject) {
    await createTableFromSelection(context, selection)
  } else {
    await updateRightCell(context, selection, tableOrNullObject)
  }
}

export async function processWordDocument() {
  await Word.run(async context => {
    try {
      await processStandard(context)
    } catch (e) {
      console.log(`error: ${e}`)
    }
  })
}
