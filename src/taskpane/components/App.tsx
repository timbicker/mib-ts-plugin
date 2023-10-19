import React from "react"
import Progress from "./Progress"
import {Translate} from "./Translate.jsx"
import {ThemeProvider} from "@emotion/react"
import {theme} from "../theme"

/* global Word, require */

export const host = "https://api-proxy.osc-fr1.scalingo.io" //http://localhost:5000/

export interface AppProps {
  title: string
  isOfficeInitialized: boolean
}

const App: React.FC<AppProps> = ({title, isOfficeInitialized}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const click = async () => {
    return Word.run(async context => {
      /**
       * Insert your Word code here
       */

      // insert a paragraph at the end of the document.
      const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end)

      // change the paragraph color to blue.
      paragraph.font.color = "blue"

      await context.sync()
    })
  }

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
    <div className="ms-welcome">
      <ThemeProvider theme={theme}>
        <Translate />
      </ThemeProvider>
    </div>
  )
}

export default App
