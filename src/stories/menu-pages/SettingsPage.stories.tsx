import {DummyWordSceleton} from "../DummyAppSceleton"
import {ThemeProvider} from "@emotion/react"
import {theme} from "../../taskpane/components/theme"
import Box from "@mui/material/Box"
import {TopBar} from "../../taskpane/components/NavigationMenu"
import React from "react"
import type {Meta, StoryObj} from "@storybook/react"
import {SettingsPageInner} from "../../taskpane/components/menu-pages/SettingsPage"

const meta = {
  title: "Menu Pages/Settings Page",
  // component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SettingsPageInner>
export default meta

type Story = StoryObj<typeof SettingsPageInner>

export function SettingsPage() {
  return (
    <DummyWordSceleton>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <TopBar
            page={"settings"}
            setPage={() => null}
          />
          <SettingsPageInner
            page={"settings"}
            setPage={() => null}
          />
        </Box>
      </ThemeProvider>
    </DummyWordSceleton>
  )
}
