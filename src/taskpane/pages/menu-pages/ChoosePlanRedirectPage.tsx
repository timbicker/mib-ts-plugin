import {Stack} from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import React from "react"

export function ChoosePlanRedirectPage() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      pt={2}
      pl={3}
      pr={3}
      gap={2}
    >
      <Typography sx={{mt: 12, mb: 2}}>You have no active plan.</Typography>
      <Button
        variant={"contained"}
        sx={{alignSelf: "stretch"}}
      >
        Book a plan
      </Button>
    </Stack>
  )
}
