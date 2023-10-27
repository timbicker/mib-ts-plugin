import React from "react"
import Progress from "./Progress"
import {ThemeProvider} from "@emotion/react"
import {theme} from "../theme"
import {AuthContainer} from "./AuthContainer"

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
        logo={require("./../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    )
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthContainer />
      </ThemeProvider>
    </div>
  )
}

export default App
