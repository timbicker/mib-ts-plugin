/*
Takes the first column and adds it as another column.
 */
import {updateParagraph} from "./utils"

function getCellArray(row: Word.TableRow): Word.TableCell[] {
  const cells: Word.TableCell[] = []
  cells.push(row.cells.getFirst())
  for (let i = 1; i < row.cells.items.length; i++) {
    cells.push(cells[i - 1].getNext())
  }
  return cells
}

function getRowArray(table: Word.Table): Word.TableRow[] {
  const rows: Word.TableRow[] = []
  rows.push(table.rows.getFirst())
  for (let i = 1; i < table.rows.items.length; i++) {
    rows.push(rows[i - 1].getNext())
  }
  return rows
}

function getParagraphsArray(cell: Word.TableCell): Word.Paragraph[] {
  const paragraphs: Word.Paragraph[] = []
  paragraphs.push(cell.body.paragraphs.getFirst())
  for (let i = 1; i < cell.body.paragraphs.items.length; i++) {
    paragraphs.push(paragraphs[i - 1].getNext())
  }
  return paragraphs
}

async function updateAllParagraphs(
  context: Word.RequestContext,
  sourceCell: Word.TableCell,
  targetCell: Word.TableCell,
) {
  targetCell.load("body/paragraphs/items")
  sourceCell.load("body/paragraphs/items")
  await context.sync()
  const numSourceParagraphs = sourceCell.body.paragraphs.items.length
  for (let i = 1; i < numSourceParagraphs; i++) {
    targetCell.body.insertParagraph("", "End")
  }
  targetCell.load("body/paragraphs/items")
  await context.sync()
  const sourceParagraphs = getParagraphsArray(sourceCell)
  const targetParagraphs = getParagraphsArray(targetCell)
  for (let i = 0; i < sourceParagraphs.length; i++) {
    // todo loading on collection does not work
    const sourceParagraph = sourceParagraphs[i]
    const targetParagraph = targetParagraphs[i]
    sourceParagraph.load("font,text")
    targetParagraph.load("listOrNullObject/isNullObject")
    await context.sync()
    if (!targetParagraph.listOrNullObject.isNullObject) {
      targetParagraph.detachFromList()
    }
    updateParagraph(targetParagraph, sourceParagraph, sourceParagraph.text.trim())
  }
}

async function _extendTable(context: Word.RequestContext, table: Word.Table) {
  table.addColumns("End", 1)
  table.load("rows/items")
  await context.sync()

  const rowArray = getRowArray(table)

  // Iterate through the non-empty paragraphs and set each cell's value
  for (const row of rowArray) {
    row.load("cells/items")
    await context.sync()
    const cells = getCellArray(row)
    const sourceCell = cells[0]
    const targetCell = cells[cells.length - 1]
    await updateAllParagraphs(context, sourceCell, targetCell)
  }

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
    throw new Error("The selection is not inside a table.")
  }
  await _extendTable(context, tableOrNullObject)
}

export async function extendTable() {
  await Word.run(async context => {
    try {
      await processStandard(context)
    } catch (e) {
      console.log(`error: ${e}`)
    }
  })
}