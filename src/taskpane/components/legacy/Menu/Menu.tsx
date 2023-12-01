import React, {useEffect, useRef, useState} from "react"
import {Box} from "@mui/system"
import {Alert, Divider} from "@mui/material"
import {countries, Country} from "../../languages"
import ApiInput from "../ApiInput"
import {mibGrey, mibTürkis} from "../../../theme"
import {Usage} from "../Usage"
import {PlansAccordion} from "../Plans"
import {Welcome} from "../Welcome"
import {Authorization} from "./Authorization"
import {AboutAccordion} from "./About"
import {MIBLogo} from "../MIBLogo"
import {useAuth} from "../../../state/useAuth"
import {Translate2} from "./Translate2"

function useLocalStoragePersistance({
  apiKeyInput,
  langValue,
  checked,
  variant,
  setApiKeyInput,
  setLangValue,
  setChecked,
  setVariant,
}: {
  apiKeyInput: string
  langValue: Country
  checked: boolean
  variant: string
  setApiKeyInput: (apiKeyInput: string) => void
  setLangValue: (langValue: Country) => void
  setChecked: (checked: boolean) => void
  setVariant: (variant: string) => void
}) {
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
}

export const Menu = ({auth}: {auth: ReturnType<typeof useAuth>}) => {
  const {user, authorized, apiKeyInput, setApiKeyInput, handleApiKeyInput, updateSession, isUpdatingSession} =
    auth

  const [langValue, setLangValue] = useState<Country>(countries[1])

  const [checked, setChecked] = React.useState(false)
  const [variant, setVariant] = React.useState("")

  useLocalStoragePersistance({
    apiKeyInput,
    langValue,
    checked,
    variant,
    setApiKeyInput,
    setLangValue,
    setChecked,
    setVariant,
  })

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

      <Box sx={{display: authorized ? "flex" : "none", flexDirection: "column"}}>
        <Translate2
          variant={variant}
          setVariant={setVariant}
          checked={checked}
          setChecked={setChecked}
          langValue={langValue}
          setLangValue={setLangValue}
        />
        <Usage
          scrollToBottom={scrollToBottom}
          user={user}
          isUpdatingSession={isUpdatingSession}
          updateSession={updateSession}
          accordSumStyles={accordSumStyles}
        />
        <PlansAccordion
          scrollToBottom={scrollToBottom}
          accordSumStyles={accordSumStyles}
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
