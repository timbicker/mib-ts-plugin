import {Box} from "@mui/system"
import {mibBlack, mibTürkis} from "../../theme"
import {Avatar, Button} from "@mui/material"
import Typography from "@mui/material/Typography"
import LanguageSelect from "../LanguageSelect"
import {AddSprachklausel} from "../AddSprachKlausel"
import React from "react"

async function createTableFromSelection(context: Word.RequestContext, selection: Word.Range) {
  selection.load("paragraphs/text")
  await context.sync()

  const nonEmptyParagraphs = selection.paragraphs.items.filter(p => p.text.trim() !== "")

  if (nonEmptyParagraphs.length > 0) {
    // Create a table with the required number of rows and 2 columns within the selected range
    const table = selection.insertTable(nonEmptyParagraphs.length, 2, Word.InsertLocation.after, [])
    table.load("rows/cells")

    await context.sync()

    // Iterate through the non-empty paragraphs and set each cell's value
    for (let i = 0; i < nonEmptyParagraphs.length; i++) {
      const paraText = nonEmptyParagraphs[i].text

      const cell1 = table.rows.items[i].cells.items[0]
      const cell2 = table.rows.items[i].cells.items[1]

      cell1.body.insertParagraph(paraText, Word.InsertLocation.end)
      cell2.body.insertParagraph(paraText, Word.InsertLocation.end)
    }

    // Delete the original selection after inserting the table
    selection.delete()

    await context.sync()
  } else {
    console.log("No non-empty paragraphs found in the selection.")
  }
}

async function updateRightCell(context: Word.RequestContext, selection: Word.Range) {
  const table = selection.parentTable
  table.load("rows/columns/items")
  await context.sync()

  // Check if table has two columns
  const columnsCount = table.rows.items[0].cells.items.length
  if (columnsCount !== 2) {
    throw new Error("The table does not have two columns.")
  }

  // Determine which cell the selection is in
  const cell = selection.getRange(Word.RangeLocation.whole).parentTableCellOrNullObject
  cell.load("cellIndex, parentRow")
  await context.sync()

  if (cell.isNullObject) {
    throw new Error("Could not determine the cell.")
  }

  if (cell.cellIndex === 1) {
    throw new Error("The selection is in the right cell.")
  }

  const rightCell = cell.parentRow.cells.items[cell.cellIndex + 1]
  const content = cell.body.getRange("Whole")
  content.load("text")
  await context.sync()

  // delete content of right cell
  rightCell.body.clear()
  rightCell.body.insertParagraph(content.text, Word.InsertLocation.end)

  await context.sync()
}
// setError: (msg: string) => void
async function processWordDocument() {
  await Word.run(async context => {
    // Get the selected range
    const selection = context.document.getSelection()
    // Load parentTable property to determine if the selection is inside a table
    selection.load("parentTable")
    await context.sync()

    if (!selection.parentTable) {
      await createTableFromSelection(context, selection)
    } else {
      await updateRightCell(context, selection)
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
