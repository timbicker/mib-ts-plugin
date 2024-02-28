import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined"
import {Box, Button, Divider, Paper, Stack} from "@mui/material"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import BarChartIcon from "@mui/icons-material/BarChart"
import AlertTitle from "@mui/material/AlertTitle"
import React from "react"

export type TokenStatusProps = {
  variant: "warning" | "okay"
  translatedCharacters: number
  charactersLeft: number
}

function formatNumberWithCommas(number: number): string {
  // Convert number to string
  let numStr: string = number.toString()

  // Split integer and fraction parts
  const parts: string[] = numStr.split(".")
  let integerPart: string = parts[0]
  const fractionPart: string = parts[1] || ""

  // Add commas for thousands
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // Concatenate integer and fraction parts
  if (fractionPart) {
    return integerPart + "." + fractionPart
  } else {
    return integerPart
  }
}

export function TokenStatus({variant, translatedCharacters, charactersLeft}: TokenStatusProps) {
  const formattedCharactersLeft = formatNumberWithCommas(charactersLeft)
  const formattedTranslatedCharacters = formatNumberWithCommas(translatedCharacters)

  function calculateNumberOfPages(characters: number): number {
    const charactersPerPage: number = 2500
    const numberOfPages: number = characters / charactersPerPage
    return Math.round(numberOfPages * 10) / 10 // Round to one decimal digit
  }

  function charactersLeftText() {
    if (variant === "warning") return `Only ${formattedCharactersLeft} characters left`
    return `${formattedCharactersLeft} characters left`
  }

  function charactersLeftIcon() {
    if (variant === "warning") return undefined
    return <TranslateOutlinedIcon />
  }

  return (
    <Paper
      elevation={0}
      variant={"outlined"}
      sx={{
        p: 2,
      }}
    >
      <Typography variant={"h6"}>Token Status</Typography>
      <Typography sx={{mb: 1}}>In this billing cycle, you have</Typography>
      <Stack
        sx={{
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Alert
          severity="success"
          icon={<BarChartIcon />}
        >
          <AlertTitle>{formattedTranslatedCharacters} characters translated</AlertTitle>
          This approximates to {calculateNumberOfPages(translatedCharacters)} pages.
        </Alert>
        <Alert
          severity={variant === "warning" ? "warning" : "info"}
          icon={charactersLeftIcon()}
        >
          <AlertTitle>{charactersLeftText()}</AlertTitle>
          This is a approximates to {calculateNumberOfPages(charactersLeft)} pages.
        </Alert>
        <Button variant={variant === "warning" ? "contained" : "outlined"}>Get more characters</Button>
        <Box sx={{display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", columnGap: 2}}>
          <Divider />
          <Typography>OR</Typography>
          <Divider />
        </Box>
        <Button variant={variant === "warning" ? "contained" : "outlined"}>Upgrade plan</Button>
      </Stack>
    </Paper>
  )
}
