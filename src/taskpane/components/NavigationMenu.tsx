import {Pages, useAppState} from "../state/state"
import React from "react"
import Box from "@mui/material/Box"
import {MIBLogo} from "./MIBLogo"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import TranslateIcon from "@mui/icons-material/Translate"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import SettingsIcon from "@mui/icons-material/Settings"
import {Divider} from "@mui/material"

export function TopBar({page, setPage}: {page: Pages; setPage: (page: Pages) => void}) {
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
    <Box sx={{position: "sticky", top: 0, zIndex: 10000, backgroundColor: "#f7f7f7"}}>
      <Box py={2}>
        <MIBLogo />
      </Box>
      <BottomNavigation
        sx={{backgroundColor: "inherit"}}
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
      <Divider />
    </Box>
  )
}

export function TopBarLoader() {
  const {page, setPage} = useAppState()
  return (
    <TopBar
      page={page}
      setPage={setPage}
    />
  )
}
