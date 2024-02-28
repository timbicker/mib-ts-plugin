import {Stack} from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import React from "react"
import {useAppState} from "../../state/state"

export function ChoosePlanRedirectPage({onClick}: {onClick: () => void}) {
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
        onClick={onClick}
      >
        Book a plan
      </Button>
    </Stack>
  )
}

export function ChoosePlanRedirectPageLoader() {
  const {setPage} = useAppState()
  return <ChoosePlanRedirectPage onClick={() => setPage("settings/choose-plan")} />
}
