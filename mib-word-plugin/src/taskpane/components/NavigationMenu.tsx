import {useAppState} from "../state/state"
import React, {ReactNode} from "react"
import Box from "@mui/material/Box"
import TranslateIcon from "@mui/icons-material/Translate"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import SettingsIcon from "@mui/icons-material/Settings"
import {Divider} from "@mui/material"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import {Page} from "../state/usePage"
import {MIBLogo} from "@shared/components/MIBLogo"

export function TopBarWithoutTabs({children}: {children?: ReactNode}) {
  return (
    <Box sx={{position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#f7f7f7"}}>
      <Box py={2}>
        <MIBLogo color={"standard"} />
      </Box>
      {children}
      <Divider />
    </Box>
  )
}

export function TopBar({page, setPage}: {page: Page; setPage: (page: Page) => void}) {
  function pageToIndex() {
    const mapping: Record<string, number> = {
      new: 0,
      update: 1,
      settings: 2,
    }

    const startingPath = page.split("/")[0]
    return mapping[startingPath]
  }

  const indexToPage: Record<number, Page> = {
    0: "new",
    1: "update",
    2: "settings",
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setPage(indexToPage[newValue])
  }

  return (
    <TopBarWithoutTabs>
      <Tabs
        value={pageToIndex()}
        onChange={handleChange}
        variant={"fullWidth"}
      >
        <Tab
          icon={<TranslateIcon fontSize={"small"} />}
          label="New Translation"
        />
        <Tab
          icon={<AutorenewIcon fontSize={"small"} />}
          label="Update Translation"
        />
        <Tab
          icon={<SettingsIcon fontSize={"small"} />}
          label="Settings"
        />
      </Tabs>
    </TopBarWithoutTabs>
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
