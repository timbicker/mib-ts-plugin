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

function mergeLoadPaths(sourcePath: string, paths: string[]) {
  return paths.map(path => `${sourcePath}/${path}`).join(",")
}

async function _extendTable(context: Word.RequestContext, table: Word.Table) {
  table.addColumns("End", 1)
  table.load("rows/items")
  await context.sync()

  const rowArray = getRowArray(table)

  // Iterate through the non-empty paragraphs and set each cell's value
  for (const row of rowArray) {
    row.load("cells/items/body/paragraphs/items")
    await context.sync()
    const cells = getCellArray(row)
    const sourceCell = cells[0]
    const targetCell = cells[cells.length - 1]
    const sourceParagraph = sourceCell.body.paragraphs.getFirst()
    const paragraphRight = targetCell.body.paragraphs.getFirst()
    sourceParagraph.load("font,style,text,listOrNullObject/id,listOrNullObject/levelTypes")
    paragraphRight.load(
      "font,style,text,listOrNullObject/isNullObject,listOrNullObject/id,listOrNullObject/levelTypes",
    )
    await context.sync()
    if (!paragraphRight.listOrNullObject.isNullObject) {
      paragraphRight.detachFromList()
    }
    updateParagraph(paragraphRight, sourceParagraph, sourceParagraph.text.trim())
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
