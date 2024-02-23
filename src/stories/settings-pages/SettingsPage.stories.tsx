import React from "react"
import type {Meta, StoryObj} from "@storybook/react"
import {Decorators, decorators} from "../decorators"
import {ChoosePlanPage, MyPlanPage} from "../../taskpane/pages/settings-pages/MyPlan"
import {Primary} from "../components/TokenStatus.stories"
import {TokenStatusProps} from "../../taskpane/components/TokenStatus"
import {AboutPage} from "../../taskpane/pages/settings-pages/About"
import {SettingsMenu} from "../../taskpane/pages/settings-pages/SettingsMenu"
import {TokenStatusPage} from "../../taskpane/pages/settings-pages/TokenStatusPage"
import {ContactUsPage} from "../../taskpane/pages/settings-pages/ContactUs"

const meta = {
  title: "Menu Pages/Settings Pages",
  decorators: [decorators.settingsPage],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    page: "settings",
    setPage: () => null,
  },
  component: SettingsMenu,
} satisfies Meta<typeof SettingsMenu> & {args: Decorators.SettingsPage}
export default meta

type Story = StoryObj<typeof SettingsMenu & {args: Decorators.SettingsPage}>

export const MenuActivePlan: Story = {
  name: "Menu with active plan",
  args: {
    activePlan: true,
  },
}

export const MenuNoActivePlan: Story = {
  name: "Menu no active plan",
  args: {
    activePlan: false,
  },
}

export const ChoosePlan: Story = {
  name: "Choose Plan",
  args: {
    page: "settings/choose-plan",
  },
  render: ChoosePlanPage,
}

export const MyPlan: Story = {
  name: "My Plan",
  args: {
    page: "settings/my-plan",
  },
  render: MyPlanPage,
}

export const About: Story = {
  name: "About",
  args: {
    page: "settings/about",
  },
  render: AboutPage,
}

export const TokenStatus: Story = {
  name: "Token Status",
  args: {
    page: "settings/token-status",
    tokenStatusProps: Primary.args as TokenStatusProps,
  },
  render: TokenStatusPage,
}

export const ContactUs: Story = {
  name: "Contact Us",
  args: {
    page: "settings/contact",
  },
  render: ContactUsPage,
}
