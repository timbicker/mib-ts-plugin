export type TranslationLog = string[]
export type TranslationLogState = {
  log: TranslationLog
  addMessage: (message: string) => void
  clear: () => void
}

let log: any = null

function getLog(): TranslationLogState {
  if (log === null) throw Error("Log can't be null")
  return log
}

function setLog(newLog: TranslationLogState) {
  log = newLog
}

export {getLog, setLog}
