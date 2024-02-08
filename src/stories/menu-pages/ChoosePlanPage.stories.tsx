import {DummyWordSceleton} from "../DummyAppSceleton"
import {ThemeProvider} from "@emotion/react"
import {theme} from "../../taskpane/components/theme"
import Box from "@mui/material/Box"
import {TopBar} from "../../taskpane/components/NavigationMenu"
import {
  ChoosePlanPageInner,
  ChoosePlanPageRedirectInner,
} from "../../taskpane/components/menu-pages/ChoosePlanPage"
import React from "react"
import type {Meta, StoryObj} from "@storybook/react"

const meta = {
  title: "Menu Pages/Choose Plan Page",
  // component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChoosePlanPageInner>
export default meta

type Story = StoryObj<typeof ChoosePlanPageInner>

export function ChoosePlanPage() {
  return (
    <DummyWordSceleton>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <TopBar
            page={"settings/plan"}
            setPage={() => null}
          />
          <ChoosePlanPageInner />
        </Box>
      </ThemeProvider>
    </DummyWordSceleton>
  )
}
