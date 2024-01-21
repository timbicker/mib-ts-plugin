import React, {useState} from "react"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Stack from "@mui/material/Stack"
import {Button, CardActionArea, Divider, Link} from "@mui/material"
import TranslateIcon from "@mui/icons-material/Translate"
import {LanguageSelect} from "../LanguageSelect"
import {ExplanationStep} from "../ExplanationStep"
import Typography from "@mui/material/Typography"
import {useAppState} from "../../state/state"
import {TranslateLogProvider} from "../TranslationLog"
import Paper from "@mui/material/Paper"
import {TranslationPaper} from "./TranslationPaper"
import {extendOneColumnTable} from "../../state/translate/translate"

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

type TranslationSettings = {
  table: boolean
}

function TranslationSettings({
  translationSettings,
  setTranslationSettings,
}: {
  translationSettings: TranslationSettings
  setTranslationSettings: (s: TranslationSettings) => void
}) {
  return (
    <TranslationPaper title={"Configuration"}>
      <Box
        sx={{
          mt: -1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={translationSettings.table}
          onClick={() => setTranslationSettings({table: !translationSettings.table})}
        />
        <Typography variant={"subtitle2"}>
          {"Table formatted. "}
          <Link
            href={"https://google.com"}
            target={"_blank"}
          >
            {"Read more."}
          </Link>
        </Typography>
      </Box>
    </TranslationPaper>
  )
}

export function NewPage() {
  const {isTranslating, createTranslationFromStandard} = useAppState()
  const [settings, setSettings] = useState({table: false})
  if (isTranslating !== "idle") {
    return <TranslateLogProvider />
  }

  function getStep1Text() {
    const select = settings.table ? "table" : "text"
    return `Select the ${select} you want to translate.`
  }
  return (
    <Stack
      direction={"column"}
      alignItems={"stretch"}
      justifyContent={"center"}
      pt={2}
      pl={3}
      pr={3}
      gap={2}
    >
      <TranslationSettings
        setTranslationSettings={setSettings}
        translationSettings={settings}
      />
      <TranslationPaper title={"Preparation"}>
        <Box
          sx={{
            pt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 3,
          }}
        >
          <ExplanationStep
            nr={1}
            text={getStep1Text()}
          />
          <ExplanationStep
            nr={2}
            text={"Choose a language for translation."}
            content={<LanguageSelect />}
          />
        </Box>
      </TranslationPaper>
      <Button
        variant={"contained"}
        startIcon={<TranslateIcon />}
        sx={{pl: 2, pr: 2}}
        onClick={settings.table ? extendOneColumnTable : createTranslationFromStandard}
      >
        New Translation
      </Button>
    </Stack>
  )
}
