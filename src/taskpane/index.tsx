import "./firebase"
import {AppContainer} from "react-hot-loader"
import {initializeIcons} from "@fluentui/font-icons-mdl2"
import {ThemeProvider} from "@fluentui/react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"

// eslint-disable-next-line no-redeclare
/* global document, Office, module, require */

initializeIcons()

let isOfficeInitialized = false

const title = "Make it Bilingual"

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider>
        <Component
          title={title}
          isOfficeInitialized={isOfficeInitialized}
        />
      </ThemeProvider>
    </AppContainer>,
    document.getElementById("container"),
  )
}

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true
  render(App)
})

if ((module as any).hot) {
  ;(module as any).hot.accept("./App", () => {
    const NextApp = require("./App").default
    render(NextApp)
  })
}
