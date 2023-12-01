import React, {createContext, PropsWithChildren, useContext, useState} from "react"
import {Country} from "../components/languages"

const AppStateContext = createContext<FormPageState | null>(null)

export const useAppStateProvider = () => {
  const [page, setPage] = useState<"new" | "update" | "settings">("new")
  const [language, setLanguage] = useState<Country>()

  return {
    page,
    setPage,
    language,
    setLanguage,
  }
}

type FormPageState = ReturnType<typeof useAppStateProvider>

export const useAppState = () => {
  const state = useContext(AppStateContext)

  if (state === null) throw Error("FormPage state cannot be null")
  return state
}

export const AppStateProvider = ({state, children}: PropsWithChildren<{state: FormPageState}>) => {
  return <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
}
