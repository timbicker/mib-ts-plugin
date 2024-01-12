export type ListMessage = {
  type: "list"
  paragraph: Word.Paragraph
}

export type TableMessage = {
  type: "table"
  table: Word.Table
}

export type ImageMessage = {
  type: "image"
}

export type ErrorMessage = {
  type: "error"
  message: string
}

export type LogMessage = ListMessage | TableMessage | ImageMessage | ErrorMessage
export type TranslationLogMessages = LogMessage[]
export type TranslationLogState = {
  log: TranslationLogMessages
  processedParagraphs: number
  totalParagraphs: number
  setTotalParagraphs: (total: number) => void
  setProcessedParagraphs: (processed: number) => void
  addMessage: (message: LogMessage) => void
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
