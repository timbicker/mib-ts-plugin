import React from "react"
import Progress from "./Progress"
import {ThemeProvider} from "@emotion/react"
import {theme} from "../theme"
import Logo from "@assets/logo-filled.png"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import TranslateIcon from "@mui/icons-material/Translate"
import SettingsIcon from "@mui/icons-material/Settings"
import Box from "@mui/material/Box"
import {MIBLogo} from "./MIBLogo"
import {AppStateProvider, useAppState, useAppStateProvider} from "../state/state"
import {NewPage} from "./NewPage"
import {UpdatePage} from "./UpdatePage"
import {SettingsPage} from "./SettingsPage"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Word, require */

export interface AppProps {
  title: string
  isOfficeInitialized: boolean
}

function TopBar() {
  const {page, setPage} = useAppState()

  const pageToIndex = {
    new: 0,
    update: 1,
    settings: 2,
  }

  const indexToPage = {
    0: "new",
    1: "update",
    2: "settings",
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setPage(indexToPage[newValue])
  }

  return (
    <Box>
      <Box py={2}>
        <MIBLogo />
      </Box>
      <Tabs
        value={pageToIndex[page]}
        onChange={handleChange}
        sx={{
          flexGrow: "1",
        }}
        variant="fullWidth"
      >
        <Tab
          icon={<TranslateIcon />}
          label="New translation"
        />
        <Tab
          icon={<AutorenewIcon />}
          label="Update translation"
        />
        <Tab
          icon={<SettingsIcon />}
          label="Settings"
        />
      </Tabs>
    </Box>
  )
}

function Pages() {
  const {page} = useAppState()

  switch (page) {
    case "new":
      return <NewPage />
    case "update":
      return <UpdatePage />
    case "settings":
      return <SettingsPage />
    default:
      const __exhaustedCheck: never = page
      throw Error(`Unknown page: ${page}`)
  }
}

const App: React.FC<AppProps> = ({title, isOfficeInitialized}) => {
  const state = useAppStateProvider()
  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={Logo}
        message="Please sideload your addin to see app body."
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <AppStateProvider state={state}>
        <TopBar />
        <Pages />
      </AppStateProvider>
    </ThemeProvider>
  )
}

export default App
