import React from "react"
import Progress from "./components/Progress"
import {ThemeProvider} from "@emotion/react"
import Logo from "@assets/logo-filled.png"
import {AppStateProvider, useAppState, useAppStateProvider} from "./state/state"
import {NewTranslationPage} from "./pages/menu-pages/NewTranslationPage"
import {UpdatePage} from "./pages/menu-pages/UpdatePage"
import {SettingsPageLoader} from "./pages/settings-pages/SettingsPage"
import {TopBarLoader} from "./components/NavigationMenu"
import Box from "@mui/material/Box"
import {theme} from "./components/theme"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Word, require */

export interface AppProps {
  title: string
  isOfficeInitialized: boolean
}

function Pages() {
  const {page} = useAppState()

  if (page.startsWith("new")) return <NewTranslationPage />
  if (page.startsWith("update")) return <UpdatePage />
  if (page.startsWith("settings")) return <SettingsPageLoader />
  return <NewTranslationPage />
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
        <Box sx={{position: "relative"}}>
          <TopBarLoader />
          <Pages />
        </Box>
      </AppStateProvider>
    </ThemeProvider>
  )
}

export default App
