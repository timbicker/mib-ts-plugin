import "@shared/initFirebaseFrontend"
import {createRoot} from "react-dom/client"
import * as React from "react"
import App from "./App"

// eslint-disable-next-line no-redeclare
/* global document, Office, module, require */

const rootElement = document.getElementById("container")
if (!rootElement) throw Error("no root element")
const root = createRoot(rootElement)

/* Render application after Office initializes */
Office.onReady(() => {
  root.render(<App />)
})
