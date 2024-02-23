import React from "react"
import type {Meta, StoryObj} from "@storybook/react"
import {TranslationLog, TranslationLogProps} from "../taskpane/components/TranslationLog"
import {TranslationLogMessages} from "../taskpane/state/translationLog"
import {DummyAppSceleton, DummyWordPage, DummyWordSceleton} from "./DummyAppSceleton"

function StoryComponent(props: TranslationLogProps) {
  return (
    <DummyWordSceleton>
      <DummyAppSceleton page={"new"}>
        <TranslationLog {...props} />
      </DummyAppSceleton>
    </DummyWordSceleton>
  )
}

const meta = {
  title: "Translation Log",
  component: StoryComponent,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TranslationLog>
export default meta
type Story = StoryObj<typeof TranslationLog>

const logMessages: TranslationLogMessages = [
  {
    type: "image",
  },
  {
    type: "list",
    paragraph: {} as any,
  },
  {
    type: "list",
    paragraph: {} as any,
  },
  {
    type: "table",
    table: {} as any,
  },
]

export const Done: Story = {
  args: {
    translationProgress: 100,
    logMessages,
  },
}

export const Loading: Story = {
  args: {
    translationProgress: 50,
    logMessages,
  },
}
