import {Avatar} from "@mui/material"
import React from "react"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import {mibBlack} from "@shared/theme"

function StepNumber({nr}: {nr: number}) {
  return <Avatar sx={{border: `0.2px solid ${mibBlack}`, color: mibBlack, bgcolor: "white"}}>{nr}</Avatar>
}

export function ExplanationStep({
  nr,
  text,
  content,
}: {
  nr: number
  text: string
  content?: React.ReactElement
}) {
  return (
    <Stack direction={"column"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
      >
        <StepNumber nr={nr} />
        <Typography
          variant="subtitle2"
          color="initial"
        >
          {text}
        </Typography>
      </Stack>
      {content ? (
        <Stack
          justifyContent={"center"}
          pt={1}
          pl={"44px"}
        >
          {content}
        </Stack>
      ) : null}
    </Stack>
  )
}
