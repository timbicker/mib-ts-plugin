import {Meta, StoryObj} from "@storybook/react"
import {TokenStatus} from "../../taskpane/components/TokenStatus"

const meta: Meta<typeof TokenStatus> = {
  title: "Components/Token Status",
  component: TokenStatus,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: ["warning", "okay"],
      control: "inline-radio",
    },
  },
}

export default meta

type Story = StoryObj<typeof TokenStatus>

export const Primary: Story = {
  name: "Token Status",
  args: {
    variant: "warning",
    charactersLeft: 2000,
    translatedCharacters: 4000,
  },
}
