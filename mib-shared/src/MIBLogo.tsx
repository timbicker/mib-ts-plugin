import {Box} from "@mui/system"
import logoGrey from "./logo-images/icon-64.png"
import logoWhite from "./logo-images/logo-filled_white.png"
import Typography from "@mui/material/Typography"
import React from "react"
import {SxProps} from "@mui/material"

export function MIBLogo({sx, color = "standard"}: {sx?: SxProps; color?: "white" | "standard"}) {
  function logo() {
    if (color === "white") return logoWhite.src ?? logoWhite
    return logoGrey.src ?? logoGrey
  }
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
        ...sx,
      }}
    >
      <Box
        component="img"
        sx={{
          height: 24,
          width: 24,
        }}
        alt="Logo."
        src={logo()}
      />
      <Typography
        sx={{fontSize: 20, fontWeight: 400}}
        color={color === "white" ? "white" : "primary"}
      >
        Make It Bilingual!
      </Typography>
    </Box>
  )
}
