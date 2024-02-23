import type {Meta, StoryObj} from "@storybook/react"
import {DummyWordSceleton} from "../DummyAppSceleton"
import React from "react"
import {RegisterPageInner} from "../../taskpane/pages/public-pages/RegisterPage"

export function RegisterPage() {
  return (
    <DummyWordSceleton>
      <RegisterPageInner />
    </DummyWordSceleton>
  )
}

const meta = {
  title: "Full Pages/Register Page",
  // component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RegisterPageInner>
export default meta

type Story = StoryObj<typeof RegisterPageInner>
