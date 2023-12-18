import {updateRightCell} from "./updateRightCell"
import {createTableFromSelection} from "./createTableFromSelection"
import {getLog} from "../translationLog"

async function processStandard(context: Word.RequestContext) {
  // Get the selected range
  const selection = context.document.getSelection()
  await createTableFromSelection(context, selection)
}

export async function createTranslation() {
  await Word.run(async context => {
    try {
      await processStandard(context)
    } catch (e) {
      if (e instanceof Error) {
        getLog().addMessage(`error: ${e.message}`)
      }
      console.log(`error: ${e}`)
    }
  })
}

export async function updateTranslation() {
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
