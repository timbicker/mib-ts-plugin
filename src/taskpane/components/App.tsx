import React from "react"
import Progress from "./Progress"
import {ThemeProvider} from "@emotion/react"
import {theme} from "../theme"
import Logo from "@assets/logo-filled.png"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global Word, require */

export interface AppProps {
  title: string
  isOfficeInitialized: boolean
}

const App: React.FC<AppProps> = ({title, isOfficeInitialized}) => {
  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={Logo}
        message="Please sideload your addin to see app body."
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div>Hello</div>
    </ThemeProvider>
  )
}

export default App
