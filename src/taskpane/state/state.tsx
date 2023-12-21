import React, {createContext, PropsWithChildren, useContext, useState} from "react"
import {Country} from "../components/languages"
import * as translate from "./translate/translate"
import {TranslationLog, TranslationLogState, setLog as setLogModule} from "./translationLog"

const AppStateContext = createContext<FormPageState | null>(null)

type Pages = "new" | "new/standard" | "new/table" | "update" | "settings" | "settings/about" | "settings/plan"

function useTranslationLog(): TranslationLogState {
  const [_log, setLog] = useState<TranslationLog>([])

  function addMessage(message: string) {
    setLog(oldLog => [...oldLog, message])
  }

  function clear() {
    setLog([])
  }

  const data = {
    log: _log,
    addMessage,
    clear,
  }

  setLogModule(data)
  return data
}

export const useAppStateProvider = () => {
  const [page, setPage] = useState<Pages>("new")
  const [language, setLanguage] = useState<Country>()
  const [isTranslating, setIsTranslating] = useState<"idle" | "translating" | "success">("idle")
  const {log, addMessage, clear} = useTranslationLog()

  async function updateTranslation() {
    setIsTranslating("translating")
    await translate.updateTranslation()
    setIsTranslating("success")
  }

  async function createTranslationFromStandard() {
    setIsTranslating("translating")
    await translate.createTranslation()
    setIsTranslating("success")
  }

  async function createTranslationFromTable() {
    setIsTranslating("translating")
    await translate.extendOneColumnTable()
    setIsTranslating("success")
  }

  return {
    page,
    setPage,
    language,
    setLanguage,
    updateTranslation,
    createTranslationFromStandard,
    createTranslationFromTable,
    isTranslating,
    log,
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
