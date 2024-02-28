import React from "react"
import Progress from "./components/Progress"
import {ThemeProvider} from "@emotion/react"
import {theme} from "./theme"
import {AuthContainer} from "./components/AuthContainer"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Word, require */

export interface AppProps {
  title: string
  isOfficeInitialized: boolean
}

const LegacyApp: React.FC<AppProps> = ({title, isOfficeInitialized}) => {
  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={require("@assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthContainer />
    </ThemeProvider>
  )
}

export default LegacyApp
