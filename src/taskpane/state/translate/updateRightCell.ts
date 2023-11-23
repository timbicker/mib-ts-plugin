export async function updateRightCell(
  context: Word.RequestContext,
  selection: Word.Range,
  table: Word.Table,
) {
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
