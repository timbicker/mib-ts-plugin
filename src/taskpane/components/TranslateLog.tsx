import React from "react"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import {useAppState} from "../state/state"
import {ListMessage, LogMessage, TranslationLog} from "../state/translationLog"
import Typography from "@mui/material/Typography"

function TranslateLoading({progress}: {progress: number}) {
  return (
    <Box sx={{width: "100%"}}>
      <LinearProgress
        variant="determinate"
        value={progress}
      />
    </Box>
  )
}

function ListMessage() {
  return <Typography>List was found</Typography>
}

function TableMessage() {
  return <Typography>Table was found</Typography>
}

function ImageMessage() {
  return <Typography>Image was found</Typography>
}

function Log({log}: {log: TranslationLog}) {
  function renderMessage(msg: LogMessage, key: number) {
    switch (msg.type) {
      case "list":
        return <ListMessage key={key} />
      case "table":
        return <TableMessage key={key} />
      case "image":
        return <ImageMessage key={key} />
      case "error":
        return <Typography>Error: {msg.message}</Typography>
    }
  }
  return <Box>{log.map(renderMessage)}</Box>
}

export function TranslateLog() {
  const {log, isTranslating} = useAppState()

  const renderLoading = () => {
    if (isTranslating !== "translating") return null
    return <TranslateLoading progress={log.translationProgress} />
  }

  return (
    <Box>
      {renderLoading()}
      <Log log={log.log} />
    </Box>
  )
}
