import React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"
import {Button, CardActionArea} from "@mui/material"
import TranslateIcon from "@mui/icons-material/Translate"
import {LanguageSelect} from "./LanguageSelect"
import {ExplanationStep} from "./ExplanationStep"
import Typography from "@mui/material/Typography"
import {processWordDocument} from "../state/translate/translate"
import {useAppState} from "../state/state"

function SelectionCard({title, content, onClick}: {title: string; content: string; onClick: () => void}) {
  function renderContent() {
    const paragraphs = content.split("\n")
    const withBreaks = paragraphs.map((paragraph, index) => {
      if (index > 0) {
        return (
          <span key={index}>
            <br />
            {paragraph}
          </span>
        )
      }
      return <span key={index}>{paragraph}</span>
    })
    return <Typography variant="body2">{withBreaks}</Typography>
  }
  return (
    <Box sx={{maxWidth: "20rem"}}>
      <Card variant="outlined">
        <CardActionArea onClick={onClick}>
          <CardHeader title={title} />
          <CardContent>{renderContent()}</CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

function ChooseTranslationVariantCards() {
  const {setPage} = useAppState()
  return (
    <Stack
      direction={"column"}
      spacing={3}
      alignItems={"center"}
      justifyContent={"center"}
      pt={3}
      pl={3}
      pr={3}
    >
      <SelectionCard
        title={"Standard"}
        content={
          "Choose this option if your document is not within a table.\n\nMib will transform your document into a multi-row, two-column table, where the left column is your original content and the right column is the translation."
        }
        onClick={() => setPage("new/standard")}
      />
      <SelectionCard
        title={"From Table"}
        content={
          "Choose this option if your document is formatted as a one-column table.\n\nMib will add another column and translate your document row by row."
        }
        onClick={() => setPage("new/table")}
      />
    </Stack>
  )
}

function TableTranslation() {
  return (
    <Stack
      direction={"column"}
      spacing={3}
      alignItems={"stretch"}
      justifyContent={"center"}
      pt={3}
      pl={3}
      pr={3}
    >
      <Typography variant={"h6"}>From Table</Typography>
      <ExplanationStep
        nr={1}
        text={
          "Ensure your table has only one column and contains no lists that are nested more than two levels."
        }
      />
      <ExplanationStep
        nr={1}
        text={"Select the table."}
      />
      <ExplanationStep
        nr={2}
        text={"Choose a language for translation."}
        content={<LanguageSelect />}
      />
      <Button
        variant={"outlined"}
        startIcon={<TranslateIcon />}
        sx={{pl: 2, pr: 2}}
        onClick={processWordDocument}
      >
        Translate
      </Button>
    </Stack>
  )
}

function StandardTranslation() {
  return (
    <Stack
      direction={"column"}
      spacing={3}
      alignItems={"stretch"}
      justifyContent={"center"}
      pt={3}
      pl={3}
      pr={3}
    >
      <Typography variant={"h6"}>Standard</Typography>
      <ExplanationStep
        nr={1}
        text={"Select the text you want to translate."}
      />
      <ExplanationStep
        nr={2}
        text={"Choose a language for translation."}
        content={<LanguageSelect />}
      />
      <Button
        variant={"outlined"}
        startIcon={<TranslateIcon />}
        sx={{pl: 2, pr: 2}}
        onClick={processWordDocument}
      >
        Translate
      </Button>
    </Stack>
  )
}

export function NewPage() {
  const {page, setPage} = useAppState()
  if (page === "new/standard") return <StandardTranslation />
  if (page === "new/table") return <TableTranslation />
  return <ChooseTranslationVariantCards />
}
