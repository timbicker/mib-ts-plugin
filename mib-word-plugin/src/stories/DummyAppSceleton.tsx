import {ThemeProvider} from "@emotion/react"
import {TopBar} from "../taskpane/components/NavigationMenu"
import React, {PropsWithChildren} from "react"
import Box from "@mui/material/Box"
import {Paper} from "@mui/material"
import {theme} from "@shared/theme"
import {Page} from "../taskpane/state/usePage"

export function DummyAppSceleton({page, children}: PropsWithChildren<{page: Page}>) {
  return (
    <ThemeProvider theme={theme}>
      <TopBar
        page={page}
        setPage={() => null}
      />
      {children}
    </ThemeProvider>
  )
}

export function DummyWordPage({children}: PropsWithChildren<{}>) {
  return (
    <Box sx={{backgroundColor: "darkgrey"}}>
      <Box sx={{borderBottom: "black 1px solid", height: 100}} />
      <Box sx={{display: "flex"}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 6,
            flex: "1 1 auto",
          }}
        >
          <Paper sx={{height: "100vh", width: "1000px"}} />
        </Box>
        <Box sx={{width: "400px", backgroundColor: "white"}}>{children}</Box>
      </Box>
    </Box>
  )
}

export function DummyWordSceleton({children}: PropsWithChildren<{}>) {
  return (
    <Box
      sx={{
        backgroundColor: "darkgrey",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        height: "100vh",
      }}
    >
      <Box sx={{width: "400px", backgroundColor: "white"}}>{children}</Box>
    </Box>
  )
}
