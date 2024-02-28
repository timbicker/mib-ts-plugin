import React, {createContext, PropsWithChildren, useContext} from "react"
import {useTranslation} from "./useTranslation"
import {usePage} from "./usePage"

const AppStateContext = createContext<FormPageState | null>(null)

export const useAppStateProvider = () => {
  const translation = useTranslation()
  const {page, setPage} = usePage()

  return {
    page,
    setPage,
    translation,
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
