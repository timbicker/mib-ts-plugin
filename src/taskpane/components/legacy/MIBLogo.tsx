import {Box} from "@mui/system"
import {mibTürkis} from "../../theme"
import logo from "@assets/icon-64.png"
import Typography from "@mui/material/Typography"
import React from "react"

export function MIBLogo() {
  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "12px",
        backgroundColor: mibTürkis,
      }}
    >
      <Box
        component="img"
        sx={{
          height: 24,
          width: 24,
        }}
        alt="Logo."
        src={logo}
      />
      <Typography variant="h1">Make It Bilingual!</Typography>
    </Box>
  )
}
