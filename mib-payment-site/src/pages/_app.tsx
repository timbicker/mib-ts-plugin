import type {AppProps} from "next/app"
import {ThemeProvider} from "@emotion/react"
import {theme} from "@shared/theme"
import "@fontsource/inter/200.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/600.css"

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
