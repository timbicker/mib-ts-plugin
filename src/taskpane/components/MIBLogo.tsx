import {Box} from "@mui/system"
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
      <Typography sx={{fontSize: 20, fontWeight: 400}}>Make It Bilingual!</Typography>
    </Box>
  )
}
