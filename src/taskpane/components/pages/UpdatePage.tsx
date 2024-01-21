import React from "react"
import Stack from "@mui/material/Stack"
import {LanguageSelect} from "../LanguageSelect"
import {Button} from "@mui/material"
import TranslateIcon from "@mui/icons-material/Translate"
import {ExplanationStep} from "../ExplanationStep"
import Typography from "@mui/material/Typography"
import {useAppState} from "../../state/state"
import {TranslateLogProvider} from "../TranslationLog"
import {TranslationPaper} from "./TranslationPaper"
import Box from "@mui/material/Box"
import {updateTranslation} from "../../state/translate/translate"

export function UpdatePage() {
  const {isTranslating, createTranslationFromStandard} = useAppState()
  if (isTranslating === "translating") {
    return <TranslateLogProvider />
  }

  return (
    <Stack
      direction={"column"}
      spacing={3}
      alignItems={"stretch"}
      justifyContent={"center"}
      pt={2}
      pl={3}
      pr={3}
    >
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
            text={
              "Click into the cell that should be translated. Make it bilingual will always translate from the left cell to the right cell."
            }
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
        onClick={updateTranslation}
      >
        Update Translation
      </Button>
    </Stack>
  )
}
