import {Box} from "@mui/system"
import {mibBlack, mibTürkis} from "../../theme"
import {Avatar, Button} from "@mui/material"
import Typography from "@mui/material/Typography"
import LanguageSelect from "../LanguageSelect"
import {AddSprachklausel} from "../AddSprachKlausel"
import React from "react"

async function processWordDocument() {
  await Word.run(async context => {
    const paragraphs = context.document.body.paragraphs
    paragraphs.load("text")

    await context.sync()

    if (paragraphs.items.length > 0) {
      // Create a table with the required number of rows and 2 columns
      const table = context.document.body.insertTable(paragraphs.items.length, 2, Word.InsertLocation.end, [])

      table.load("rows/cells")
      await context.sync()

      // Iterate through the paragraphs and set each cell's value to the paragraph text
      for (let i = 0; i < paragraphs.items.length; i++) {
        const paraText = paragraphs.items[i].text

        const cell1 = table.rows.items[i].cells.items[0]
        const cell2 = table.rows.items[i].cells.items[1]

        cell1.body.insertParagraph(paraText, Word.InsertLocation.end)
        cell2.body.insertParagraph(paraText, Word.InsertLocation.end)
      }

      await context.sync()
    } else {
      console.log("No paragraphs found in the document.")
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
