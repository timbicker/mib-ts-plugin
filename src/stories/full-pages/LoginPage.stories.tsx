import type {Meta, StoryObj} from "@storybook/react"
import {LoginPageInner} from "../../taskpane/components/full-pages/LoginPage"
import {DummyWordSceleton} from "../DummyAppSceleton"
import React from "react"

export function LoginPage() {
  return (
    <DummyWordSceleton>
      <LoginPageInner />
    </DummyWordSceleton>
  )
}

const meta = {
  title: "Full Pages/Login Page",
  // component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoginPageInner>
export default meta
type Story = StoryObj<typeof LoginPageInner>
