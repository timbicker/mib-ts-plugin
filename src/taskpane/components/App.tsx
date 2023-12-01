import React from "react"
import Progress from "./Progress"
import {ThemeProvider} from "@emotion/react"
import Logo from "@assets/logo-filled.png"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import TranslateIcon from "@mui/icons-material/Translate"
import SettingsIcon from "@mui/icons-material/Settings"
import Box from "@mui/material/Box"
import {MIBLogo} from "./MIBLogo"
import {AppStateProvider, useAppState, useAppStateProvider} from "../state/state"
import {NewPage} from "./NewPage"
import {UpdatePage} from "./UpdatePage"
import {SettingsPage} from "./SettingsPage"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import RestoreIcon from "@mui/icons-material/Restore"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LocationOnIcon from "@mui/icons-material/LocationOn"

export function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)

  return (
    <Box sx={{width: 500}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          label="Recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Box>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Word, require */

export interface AppProps {
  title: string
  isOfficeInitialized: boolean
}

function TopBar() {
  const {page, setPage} = useAppState()

  function pageToIndex() {
    const mapping = {
      new: 0,
      update: 1,
      settings: 2,
    }

    const startingPath = page.split("/")[0] as any
    return mapping[startingPath]
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
      <BottomNavigation
        showLabels
        value={pageToIndex()}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="New Translation"
          icon={<TranslateIcon />}
        />
        <BottomNavigationAction
          label="Update Translation"
          icon={<AutorenewIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Box>
  )
}

function Pages() {
  const {page} = useAppState()

  if (page.startsWith("new")) return <NewPage />
  if (page.startsWith("update")) return <UpdatePage />
  if (page.startsWith("settings")) return <SettingsPage />
  return <NewPage />
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
    <ThemeProvider theme={{}}>
      <AppStateProvider state={state}>
        <TopBar />
        <Pages />
      </AppStateProvider>
    </ThemeProvider>
  )
}

export default App
