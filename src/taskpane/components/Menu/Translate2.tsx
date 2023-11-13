import {Box} from "@mui/system"
import {mibBlack, mibTürkis} from "../../theme"
import {Avatar, Button} from "@mui/material"
import Typography from "@mui/material/Typography"
import LanguageSelect from "../LanguageSelect"
import {AddSprachklausel} from "../AddSprachKlausel"
import React from "react"

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

async function createTableFromSelection(context: Word.RequestContext, selection: Word.Range) {
  selection.load("paragraphs")
  await context.sync()
  selection.paragraphs.load("font,style,text,listOrNullObject/id,listOrNullObject/levelTypes")
  await context.sync()

  const nonEmptyParagraphs = selection.paragraphs.items.filter(p => p.text.trim() !== "")
  // .map(p => new Paragraph(p))
  // selection.clear()
  // await context.sync()

  if (nonEmptyParagraphs.length > 0) {
    // Create a table with the required number of rows and 2 columns within the selected range
    const table = selection.insertTable(nonEmptyParagraphs.length, 2, Word.InsertLocation.after, [])
    table.load("rows/cells/body/paragraphs/items")
    await context.sync()

    const rightListManager = new ListManager(context)
    const leftListManager = new ListManager(context)
    // Iterate through the non-empty paragraphs and set each cell's value
    for (let i = 0; i < nonEmptyParagraphs.length; i++) {
      const cellLeft = table.rows.items[i].cells.items[0]
      const cellRight = table.rows.items[i].cells.items[1]
      const originalParagraph = nonEmptyParagraphs[i]
      const paragraphLeft = cellLeft.body.paragraphs.getFirst()
      const paragraphRight = cellRight.body.paragraphs.getFirst()
      updateParagraph(paragraphLeft, originalParagraph, originalParagraph.text.trim())
      updateParagraph(paragraphRight, originalParagraph, originalParagraph.text.trim())
      await leftListManager.updateLists(originalParagraph, paragraphLeft)
      await rightListManager.updateLists(originalParagraph, paragraphRight)
    }

    await context.sync()
  } else {
    console.log("No non-empty paragraphs found in the selection.")
  }
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

  try {
    if (tableOrNullObject.isNullObject) {
      await createTableFromSelection(context, selection)
    } else {
      await updateRightCell(context, selection, tableOrNullObject)
    }
  } catch (e) {
    console.log(`error: ${e}`)
  }
}

async function processWordDocument() {
  await Word.run(async context => {
    try {
      await processStandard(context)
    } catch (e) {
      console.log(`error: ${e}`)
    }
  })
}

export function Translate2({
  variant,
  setVariant,
  checked,
  setChecked,
  langValue,
  setLangValue,
}: {
  variant: any
  setVariant: any
  checked: any
  setChecked: any
  langValue: any
  setLangValue: any
}) {
  const handleVariant = event => {
    setVariant(event.target.value)
  }

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  const stepBoxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: "12px",
  }
  const stepNumberStyle = {border: `0.2px solid ${mibBlack}`, color: mibBlack, bgcolor: mibTürkis}
  const stepContentStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "calc(100% - 60px)",
    p: 1,
    ml: "40px",
    mr: "20px",
  }

  return (
    <Box
      sx={{
        m: 0,
        pl: 2,
        pr: 2,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        backgroundColor: mibTürkis,
      }}
    >
      <Box sx={stepBoxStyle}>
        <Avatar sx={stepNumberStyle}>1</Avatar>
        <Typography
          variant="subtitle2"
          color="initial"
        >
          Select text in Word document 22
        </Typography>
      </Box>
      <Box>
        <Box sx={stepBoxStyle}>
          <Avatar sx={stepNumberStyle}>2</Avatar>
          <Typography
            variant="subtitle2"
            color="initial"
          >
            Choose a language for translation
          </Typography>
        </Box>
        <Box sx={stepContentStyle}>
          <LanguageSelect
            langValue={langValue}
            setLangValue={setLangValue}
          />
        </Box>
      </Box>
      <Box>
        <Box sx={stepBoxStyle}>
          <Avatar sx={stepNumberStyle}>3</Avatar>
          <Typography
            variant="subtitle2"
            color="initial"
          >
            Optional settings
          </Typography>
        </Box>
        <Box sx={stepContentStyle}>
          <AddSprachklausel
            checked={checked}
            variant={variant}
            handleVariant={handleVariant}
            handleChange={handleChange}
          />
        </Box>
      </Box>
      <Box sx={stepBoxStyle}>
        <Box sx={stepContentStyle}>
          <Button
            size="large"
            variant="contained"
            onClick={processWordDocument}
          >
            Make It Bilingual!
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
