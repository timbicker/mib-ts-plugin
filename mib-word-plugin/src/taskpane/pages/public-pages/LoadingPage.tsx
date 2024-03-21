import Box from "@mui/material/Box"
import React from "react"
import {MIBLogo} from "@shared/components/MIBLogo"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

export function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // gap: 4,
        pt: "20vh",
      }}
    >
      <MIBLogo />
      {/*<Box sx={{display: "flex", gap: 3, alignItems: "center"}}>*/}
      {/*  <CircularProgress size={30} />*/}
      {/*  <Typography color={"primary"}>Loading...</Typography>*/}
      {/*</Box>*/}
      <CircularProgress
        size={30}
        sx={{mt: 10}}
      />
      <Typography
        color={"primary"}
        sx={{mt: 2}}
      >
        Loading...
      </Typography>
    </Box>
  )
}
