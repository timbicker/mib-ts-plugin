import React, {useEffect, useRef, useState} from "react"
import Typography from "@mui/material/Typography"
import {Box} from "@mui/system"
import {Alert, Divider} from "@mui/material"
import axios from "axios"
import logo from "@assets/icon-64.png"
import {countries} from "../languages"
import ApiInput from "../ApiInput"
import {mibGrey, mibTürkis} from "../../theme"
import {Usage} from "../Usage"
import {Plans} from "../Plans"
import {PlansDetails} from "../PlansDetails"
import {Welcome} from "../Welcome"
import {host} from "../App"
import {Authorization} from "./Authorization"
import {Translate} from "./Translate"
import {AboutAccordion} from "./About"

export const Menu = () => {
  const [refresh, setRefresh] = useState(0)
  const triggerRefresh = () => {
    setRefresh(refresh + 1)
  }
  const [refreshSuccess, setRefreshSuccess] = useState(false)
  const handleRefreshSuccess = bool => {
    setRefreshSuccess(bool)
  }
  const [refreshProgress, setRefreshProgress] = useState(false)
  const handleRefreshProgress = bool => {
    setRefreshProgress(bool)
  }

  const [authorized, setAuthorized] = useState(true)
  const [user, setUser] = useState<any>({monthlyCharacters: 0, remainingCharacters: 0})
  const handleUser = userData => {
    setUser(userData)
  }

  const [langValue, setLangValue] = useState(countries[1])

  const [apiKeyInput, setApiKeyInput] = React.useState("")
  const handleApiKeyInput = event => {
    setApiKeyInput(event.target.value)
  }

  const [checked, setChecked] = React.useState(false)
  const [variant, setVariant] = React.useState("")

  useEffect(() => {
    const apiKey = JSON.parse(localStorage.getItem("apiKey"))
    if (apiKey) {
      setApiKeyInput(apiKey)
    }

    const language = JSON.parse(localStorage.getItem("language"))
    if (language) {
      setLangValue(language)
    }

    const checkedAddSprachklausel = JSON.parse(localStorage.getItem("checkedAddSprachklausel"))
    if (checkedAddSprachklausel) {
      setChecked(checkedAddSprachklausel)
    }

    const variantSprachklausel = JSON.parse(localStorage.getItem("variantSprachklausel"))
    if (variantSprachklausel) {
      setVariant(variantSprachklausel)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("apiKey", JSON.stringify(apiKeyInput))
  }, [apiKeyInput])

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(langValue))
  }, [langValue])

  useEffect(() => {
    localStorage.setItem("checkedAddSprachklausel", JSON.stringify(checked))
  }, [checked])

  useEffect(() => {
    localStorage.setItem("variantSprachklausel", JSON.stringify(variant))
  }, [variant])

  // check ApiKey when starting
  const checkApi = () => {
    if (apiKeyInput) {
      axios
        .get(`${host}/api/v1/getuser?api_key=${apiKeyInput}`)
        .then(response => {
          setAuthorized(true)
          handleUser(response.data)
          handleRefreshProgress(false)
          handleRefreshSuccess(true)
        })
        .catch(function (error) {
          if (error.response) {
            setAuthorized(false)
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message)
          }
          console.log(error.config)
        })
    }
  }

  const checkUser = () => {
    if (apiKeyInput) {
      axios
        .get(`${host}/api/v1/getuser?api_key=${apiKeyInput}`)
        .then(response => {
          setAuthorized(true)
          handleUser(response.data)
          handleRefreshProgress(false)
          handleRefreshSuccess(true)
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message)
          }
          console.log(error.config)
        })
    }
  }

  useEffect(() => {
    checkApi()
  }, [apiKeyInput, refresh])

  const accordSumStyles = {backgroundColor: mibGrey}

  const apiKeyComponent = (
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
  const bottomRef = useRef(null)
  const authRef = useRef(null)
  const aboutRef = useRef(null)

  const scrollToBottom = ref => {
    setTimeout(() => ref.current?.scrollIntoView({behavior: "smooth"}), 400)
  }

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
        <Box sx={{display: authorized ? "none" : "flex", flexDirection: "column", p: 2}}>
          {apiKeyComponent}
        </Box>
      </Box>
      {authorized ? (
        ""
      ) : (
        <Box sx={{m: 3}}>
          <PlansDetails
            planActive={user.plan_Active}
            user={user}
          />
        </Box>
      )}

      <Box sx={{display: authorized ? "flex" : "none", flexDirection: "column"}}>
        <Translate
          variant={variant}
          setVariant={setVariant}
          checked={checked}
          setChecked={setChecked}
          langValue={langValue}
          setLangValue={setLangValue}
          user={user}
          checkUser={checkUser}
          apiKeyInput={apiKeyInput}
        />
        <Usage
          scrollToBottom={scrollToBottom}
          user={user}
          triggerRefresh={triggerRefresh}
          handleRefreshProgress={handleRefreshProgress}
          refreshProgress={refreshProgress}
          refreshSuccess={refreshSuccess}
          handleRefreshSuccess={handleRefreshSuccess}
          accordSumStyles={accordSumStyles}
        />
        <Plans
          scrollToBottom={scrollToBottom}
          accordSumStyles={accordSumStyles}
          planActive={user.plan_active}
          user={user}
        />
        <Authorization
          authRef={authRef}
          scrollToBottom={scrollToBottom}
          accordSumStyles={accordSumStyles}
          apiKeyComponent={apiKeyComponent}
        />
      </Box>
      <AboutAccordion
        aboutRef={aboutRef}
        accordSumStyles={accordSumStyles}
        user={user}
        scrollToBottom={scrollToBottom}
      />
      <div ref={bottomRef} />
    </Box>
  )
}

function MIBLogo() {
  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "12px",
        backgroundColor: mibTürkis,
      }}
    >
      <Box
        component="img"
        sx={{
          height: 24,
          width: 24,
        }}
        alt="Logo."
        src={logo}
      />
      <Typography variant="h1">Make It Bilingual!</Typography>
    </Box>
  )
}
