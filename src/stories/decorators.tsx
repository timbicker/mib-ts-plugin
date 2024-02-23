import React from "react"
import {SettingsPageContainer} from "../taskpane/pages/settings-pages/SettingsPage"
import {Decorator} from "@storybook/react"
import {DummyWordSceleton} from "./DummyAppSceleton"
import Box from "@mui/material/Box"
import {TopBar} from "../taskpane/components/NavigationMenu"
import {Page} from "../taskpane/state/state"

const settingsPage: Decorator = (Story, context) => {
  return (
    <DummyWordSceleton>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <TopBar
          page={context.args.page as Page}
          setPage={() => null}
        />
        <SettingsPageContainer
          page={context.args.page as Page}
          setPage={() => null}
        >
          <Story />
        </SettingsPageContainer>
      </Box>
    </DummyWordSceleton>
  )
}

const menuPage: Decorator = (Story, context) => {
  return (
    <DummyWordSceleton>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <TopBar
          page={context.args.page as Page}
          setPage={() => null}
        />
        <Story />
      </Box>
    </DummyWordSceleton>
  )
}

export const decorators = {
  settingsPage,
  menuPage,
}

export namespace Decorators {
  export type SettingsPage = {
    page: Page
  }
}
