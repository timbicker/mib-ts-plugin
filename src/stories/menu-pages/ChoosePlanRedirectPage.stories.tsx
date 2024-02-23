import React from "react"
import type {Meta, StoryObj} from "@storybook/react"

import {ChoosePlanRedirectPage} from "../../taskpane/pages/menu-pages/ChoosePlanRedirectPage"
import {decorators} from "../decorators"

const meta = {
  title: "Menu Pages/Choose Plan Redirect",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    page: "new",
  },
  decorators: [decorators.menuPage],
} satisfies Meta<typeof ChoosePlanRedirectPage>
export default meta

type Story = StoryObj<typeof ChoosePlanRedirectPage>

export const ChoosePlanRedirect: Story = {
  name: "Choose Plan Redirect",
  render: ChoosePlanRedirectPage,
}
