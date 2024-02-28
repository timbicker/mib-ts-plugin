import "./firebase"
import {createRoot} from "react-dom/client"
import * as React from "react"
import App from "./App"

// eslint-disable-next-line no-redeclare
/* global document, Office, module, require */

const rootElement: HTMLElement = document.getElementById("container")
const root = createRoot(rootElement)

/* Render application after Office initializes */
Office.onReady(() => {
  root.render(<App />)
})
