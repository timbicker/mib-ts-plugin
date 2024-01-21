import React, {createContext, PropsWithChildren, useContext, useState} from "react"
import {Country} from "../components/languages"
import * as translate from "./translate/translate"
import {
  TranslationLogMessages,
  TranslationLogState,
  setLog as setLogModule,
  LogMessage,
} from "./translationLog"

const AppStateContext = createContext<FormPageState | null>(null)

export type Pages = "new" | "update" | "settings" | "settings/about" | "settings/plan"

function useTranslationLog() {
  const [_log, setLog] = useState<TranslationLogMessages>([])
  const [processedParagraphs, _setProcessedParagraphs] = useState<number>(0)
  const [totalParagraphs, setTotalParagraphs] = useState<number>(0)

  function addMessage(message: LogMessage) {
    setLog(oldLog => [...oldLog, message])
  }

  function clear() {
    setLog([])
    _setProcessedParagraphs(0)
    setTotalParagraphs(0)
  }

  function setProcessedParagraphs(nr: number) {
    if (nr > totalParagraphs) _setProcessedParagraphs(totalParagraphs)
    else _setProcessedParagraphs(nr)
  }

  const data: TranslationLogState = {
    log: _log,
    addMessage,
    clear,
    processedParagraphs,
    totalParagraphs,
    setProcessedParagraphs,
    setTotalParagraphs,
  }

  setLogModule(data)

  const translationProgress =
    totalParagraphs === 0 ? 0 : Math.round((processedParagraphs / totalParagraphs) * 100)
  return {...data, translationProgress}
}

export const useAppStateProvider = () => {
  const [page, setPage] = useState<Pages>("new")
  const [language, setLanguage] = useState<Country>()
  const [isTranslating, setIsTranslating] = useState<"idle" | "translating" | "success">("idle")
  const log = useTranslationLog()

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

  function resetTranslation() {
    log.clear()
    setIsTranslating("idle")
  }

  return {
    page,
    setPage,
    language,
    setLanguage,
    updateTranslation,
    createTranslationFromStandard,
    resetTranslation,
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
