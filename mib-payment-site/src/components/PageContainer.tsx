import React, {PropsWithChildren} from "react"
import Box from "@mui/material/Box"
import {PaddleProvider, usePaddleProvider} from "@/state/usePaddle"
import {Link, Typography, useTheme} from "@mui/material"
import {MIBLogo} from "@shared/components/MIBLogo"

export function PageContainer({children}: PropsWithChildren<{}>) {
  const paddleState = usePaddleProvider()
  const {state} = paddleState
  const theme = useTheme()

  function renderContent() {
    if (state.type === "loading") return <Typography variant={"h1"}>Loading...</Typography>
    if (state.type === "error")
      return <Typography variant={"h1"}>There was an error. Try again or contact support.</Typography>
    if (state.type === "invalid-token")
      return (
        <Typography>
          Your token became invalid. Click on the book a plan button in the Word plugin to receive a new
          token.
        </Typography>
      )
    if (state.type === "no-token")
      return (
        <Typography>
          No token provided. Click on the book a plan button in the Word plugin to receive a token.
        </Typography>
      )
    if (state.type === "thank-you")
      return <Typography variant={"h1"}>Thank you for your purchase!</Typography>
    if (state.type === "cancelled") return <Typography variant={"h1"}>Sorry to see you go!</Typography>
    return children
  }

  return (
    <PaddleProvider state={paddleState}>
      <Box
        sx={{
          display: "grid",
          height: "100vh",
          gridTemplateColumns: "min(33vw, 500px) 1fr",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.primary.dark,
            p: 4,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <MIBLogo color={"white"} />
          <Typography
            sx={{
              mt: 4,
              width: 300,
            }}
            color={theme.palette.primary.contrastText}
          >
            Make it bilingual works together with paddle to process payments worldwide.
          </Typography>
          <Typography>
            <Link color={theme.palette.primary.contrastText}>Read more</Link>
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 24,
            ml: 8,
            mr: 8,
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </PaddleProvider>
  )
}
