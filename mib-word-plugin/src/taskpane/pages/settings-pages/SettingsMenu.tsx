import {useAppState} from "../../state/state"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import {Box} from "@mui/system"
import {Divider} from "@mui/material"
import React from "react"
import {Page} from "../../state/usePage"
import {useAuth} from "../../state/auth"
import {RedirectPaymentButton} from "../../components/RedirectPaymentButton"

export function SettingsMenu({setPage, activePlan}: {setPage: (page: Page) => void; activePlan?: boolean}) {
  const {logOut} = useAuth()
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
          onClick={logOut}
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
        sx={{pt: 4}}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 2,
          }}
        >
          <RedirectPaymentButton label={"Book a plan"} />
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
        sx={{pt: 2}}
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
