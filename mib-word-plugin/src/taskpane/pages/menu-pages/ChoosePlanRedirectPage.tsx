import {Stack} from "@mui/material"
import Typography from "@mui/material/Typography"
import React from "react"
import {RedirectPaymentButton} from "../../components/RedirectPaymentButton"

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
      <RedirectPaymentButton
        sx={{alignSelf: "stretch"}}
        label={"Book a plan"}
      />
    </Stack>
  )
}

export function ChoosePlanRedirectPageLoader() {
  return <ChoosePlanRedirectPage />
}
