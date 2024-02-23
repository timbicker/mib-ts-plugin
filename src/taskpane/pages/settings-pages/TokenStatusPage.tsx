import {TokenStatus, TokenStatusProps} from "../../components/TokenStatus"
import Box from "@mui/material/Box"
import React from "react"

export function TokenStatusPage({tokenStatusProps}: {tokenStatusProps: TokenStatusProps}) {
  const {variant, translatedCharacters, charactersLeft} = tokenStatusProps
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TokenStatus
        variant={variant}
        translatedCharacters={translatedCharacters}
        charactersLeft={charactersLeft}
      />
    </Box>
  )
}
