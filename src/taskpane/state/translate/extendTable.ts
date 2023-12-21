/*
Takes the first column and adds it as another column.
 */
import {ListManager, updateParagraph} from "./utils"

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

async function updateAllParagraphsOfRow(
  context: Word.RequestContext,
  sourceCell: Word.TableCell,
  targetCell: Word.TableCell,
  listManager: ListManager,
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
    const targetParagraph = targetParagraphs[i]
    targetParagraph.load("listOrNullObject/isNullObject")
    await context.sync()
    if (!targetParagraph.listOrNullObject.isNullObject) {
      targetParagraph.detachFromList()
    }
  }
  for (let i = 0; i < sourceParagraphs.length; i++) {
    // todo loading on collection does not work
    const sourceParagraph = sourceParagraphs[i]
    const targetParagraph = targetParagraphs[i]
    sourceParagraph.load(
      "font,style,text,listOrNullObject/id,listOrNullObject/levelTypes,listItemOrNullObject/level",
    )
    await context.sync()
    updateParagraph(targetParagraph, sourceParagraph, sourceParagraph.text.trim())
    await listManager.updateLists(sourceParagraph, targetParagraph)
  }
}

async function _extendTable(context: Word.RequestContext, table: Word.Table) {
  table.addColumns("End", 1)
  table.load("rows/items")
  table.set({
    width: 450,
  })
  await context.sync()

  const rowArray = getRowArray(table)

  const listManager = new ListManager(context, {logOnListChange: true})
  // Iterate through the non-empty paragraphs and set each cell's value
  for (const row of rowArray) {
    row.load("cells/items")
    await context.sync()
    const cells = getCellArray(row)
    const sourceCell = cells[0]
    const targetCell = cells[cells.length - 1]
    await updateAllParagraphsOfRow(context, sourceCell, targetCell, listManager)
  }

  await context.sync()
}

export async function extendTable(context: Word.RequestContext) {
  // Get the selected range
  const selection = context.document.getSelection()
  // Load parentTable property to determine if the selection is inside a table
  selection.load("parentTableOrNullObject")
  await context.sync()

  const table = selection.parentTableOrNullObject

  if (table.isNullObject) {
    throw new Error("The selection is not inside a table.")
  }
  await _extendTable(context, table)
}
