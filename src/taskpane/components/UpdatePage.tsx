import React from "react"
import Stack from "@mui/material/Stack"
import {LanguageSelect} from "./LanguageSelect"
import {Button} from "@mui/material"
import TranslateIcon from "@mui/icons-material/Translate"
import {ExplanationStep} from "./ExplanationStep"
import {updateRightCellFromWordDocument} from "../state/translate/translate"
import Typography from "@mui/material/Typography"

export function UpdatePage() {
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
      <Typography variant={"h6"}>Update</Typography>
      <ExplanationStep
        nr={1}
        text={
          "Click into the cell that should be translated. Mib will always translate from the left cell to the right cell."
        }
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
        onClick={updateRightCellFromWordDocument}
      >
        Translate
      </Button>
    </Stack>
  )
}
