import {updateRightCell} from "./updateRightCell"
import {createTableFromSelection} from "./createTableFromSelection"

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

export async function updateRightCellFromWordDocument() {
  await Word.run(async context => {
    try {
      // Get the selected range
      const selection = context.document.getSelection()
      // Load parentTable property to determine if the selection is inside a table
      selection.load("parentTableOrNullObject")
      await context.sync()
      const tableOrNullObject = selection.parentTableOrNullObject
      // todo make all necessary checks
      await updateRightCell(
        context,
        context.document.getSelection(),
        context.document.getSelection().parentTable,
      )
    } catch (e) {
      console.log(`error: ${e}`)
    }
  })
}
