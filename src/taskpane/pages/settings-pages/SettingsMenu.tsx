import {useAppState} from "../../state/state"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import {Box} from "@mui/system"
import {Divider} from "@mui/material"
import React from "react"
import {Page} from "../../state/usePage"
import {useAuth} from "../../state/auth"

export function SettingsMenu({setPage, activePlan}: {setPage: (page: Page) => void; activePlan?: boolean}) {
  function renderMisc() {
    return (
      <>
        <Button
          variant={"outlined"}
          onClick={() => setPage("settings/about")}
          fullWidth
        >
          Change Password
        </Button>
        <Button
          variant={"outlined"}
          onClick={() => setPage("settings/contact")}
          fullWidth
        >
          Contact Us
        </Button>
        <Button
          variant={"outlined"}
          onClick={() => setPage("settings/about")}
          fullWidth
        >
          About Us
        </Button>
        <Button
          variant={"outlined"}
          onClick={() => setPage("settings/about")}
          fullWidth
        >
          Log out
        </Button>
      </>
    )
  }

  if (!activePlan)
    return (
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 2,
          }}
        >
          <Button
            variant={"contained"}
            fullWidth
            sx={{mt: 2}}
            onClick={() => setPage("settings/choose-plan")}
          >
            Book a plan
          </Button>
          <Divider sx={{mt: 4, mb: 2}} />
          {renderMisc()}
        </Box>
      </Stack>
    )
  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Stack
        flexDirection={"column"}
        width={200}
        spacing={2}
      >
        <Button
          variant={"outlined"}
          fullWidth
          onClick={() => setPage("settings/token-status")}
        >
          Token Status
        </Button>
        <Button
          variant={"outlined"}
          fullWidth
          onClick={() => setPage("settings/my-plan")}
        >
          My Plan
        </Button>
        {renderMisc()}
      </Stack>
    </Stack>
  )
}

export function SettingsMenuLoader() {
  const {setPage} = useAppState()
  const {plan} = useAuth()
  return (
    <SettingsMenu
      setPage={setPage}
      activePlan={plan}
    />
  )
}
