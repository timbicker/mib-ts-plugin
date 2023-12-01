import React, {useEffect} from "react"
import {mibTürkis} from "../../theme"
import {Box} from "@mui/system"
import ApiInput from "./ApiInput"
import {Alert, Divider} from "@mui/material"
import {Welcome} from "./Welcome"
import {AboutDetails} from "./Menu/About"
import {useAuth} from "../../state/useAuth"
import {MIBLogo} from "./MIBLogo"
import {PlansDetails} from "./Plans"

function APIKeyInput({auth}: {auth: ReturnType<typeof useAuth>}) {
  const {authorized, apiKeyInput, handleApiKeyInput} = auth

  return (
    <Box>
      <Box sx={{display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start"}}>
        <ApiInput
          authorized={authorized}
          apiKeyInput={apiKeyInput}
          handleApiKeyInput={handleApiKeyInput}
        />
        <Box>
          {authorized ? (
            <Alert
              sx={{height: "100%"}}
              severity="success"
            >
              This key is valid.
            </Alert>
          ) : (
            <Alert
              sx={{height: "100%"}}
              severity="error"
            >
              {" "}
              Invalid Key. Book a plan to get your valid Authorization Key.
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export function InvalidKeyMenu({auth}: {auth: ReturnType<typeof useAuth>}) {
  const {user, apiKeyInput, updateSession} = auth

  useEffect(() => {
    updateSession()
  }, [apiKeyInput])

  return (
    <Box sx={{m: 0, p: 0, width: "100%"}}>
      <Box
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "12px",
          backgroundColor: mibTürkis,
        }}
      >
        <MIBLogo />
        <Box sx={{width: "100%", mt: 1}}>
          <Divider />
        </Box>
        <Welcome />
        <APIKeyInput auth={auth} />
      </Box>
      <Box sx={{m: 3}}>
        <PlansDetails user={user} />
      </Box>
      <AboutDetails user={user} />
    </Box>
  )
}
