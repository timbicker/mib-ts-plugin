import {DummyWordSceleton} from "../DummyAppSceleton"
import {ThemeProvider} from "@emotion/react"
import {theme} from "../../taskpane/components/theme"
import Box from "@mui/material/Box"
import {TopBar} from "../../taskpane/components/NavigationMenu"
import {ChoosePlanPageRedirectInner} from "../../taskpane/components/menu-pages/ChoosePlanPage"
import React from "react"
import type {Meta, StoryObj} from "@storybook/react"

const meta = {
  title: "Menu Pages/Choose Plan Redirect Page",
  // component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChoosePlanPageRedirectInner>
export default meta

type Story = StoryObj<typeof ChoosePlanPageRedirectInner>

export function ChoosePlanRedirectPage() {
  return (
    <DummyWordSceleton>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <TopBar
            page={"new"}
            setPage={() => null}
          />
          <ChoosePlanPageRedirectInner />
        </Box>
      </ThemeProvider>
    </DummyWordSceleton>
  )
}
