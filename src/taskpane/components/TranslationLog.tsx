import React, {ReactElement} from "react"
import Box from "@mui/material/Box"
import LinearProgress, {LinearProgressProps} from "@mui/material/LinearProgress"
import {useAppState} from "../state/state"
import {ListMessage, LogMessage, TableMessage, TranslationLogMessages} from "../state/translationLog"
import Typography from "@mui/material/Typography"
import {Alert, AlertTitle, Button, Divider, Link} from "@mui/material"
import {jumpToList, jumpToTable} from "../state/translate/jumpToElement"
import {PageContainer} from "./PageContainer"

function LinearProgressWithLabel(props: LinearProgressProps & {value: number}) {
  return (
    <Box sx={{display: "flex", alignItems: "center"}}>
      <Box sx={{width: "100%", mr: 1}}>
        <LinearProgress
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{minWidth: 35}}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

function TranslateStatus({progress}: {progress: number}) {
  const done = (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      Translation is done.
    </Alert>
  )

  const translating = (
    <Box sx={{pl: 4, pr: 4, display: "grid"}}>
      <LinearProgressWithLabel
        sx={{
          height: 10,
          borderRadius: 5,
        }}
        variant="determinate"
        value={progress}
      />
    </Box>
  )

  return (
    <Box sx={{display: "grid", alignItems: "stretch", justifyContent: "stretch", height: 72}}>
      {progress === 100 ? done : translating}
    </Box>
  )
}

function InfoMessage({
  title,
  text,
  actions,
}: {
  title: string
  text: string | ReactElement
  actions?: ReactElement
}) {
  return (
    <Box>
      <Alert severity="info">
        <AlertTitle>{title}</AlertTitle>
        {text}
        {actions ? actions : null}
      </Alert>
    </Box>
  )
}

function ListMessage({msg}: {msg: ListMessage}) {
  // todo distinguish between table and standard case
  const listActions = (
    <Box sx={{mt: 1}}>
      <Button
        variant={"outlined"}
        size={"small"}
        onClick={() => jumpToList(msg.paragraph)}
      >
        Jump To
      </Button>
    </Box>
  )
  const text = (
    <Typography variant={"body2"}>
      After translation, you might have to manually re-apply the desired format to the translated list.{" "}
      <Link
        href={"https://google.com"}
        target={"_blank"}
      >
        More information.
      </Link>
    </Typography>
  )
  return (
    <InfoMessage
      title={"Check list formatting"}
      text={text}
      actions={listActions}
    />
  )
}

function TableMessage({msg}: {msg: TableMessage}) {
  const tableActions = (
    <Box sx={{mt: 1}}>
      <Button
        variant={"outlined"}
        size={"small"}
        onClick={() => jumpToTable(msg.table)}
      >
        Jump To
      </Button>
    </Box>
  )
  return (
    <InfoMessage
      title={"A table was copied"}
      text={"The table was left as-is."}
      actions={tableActions}
    />
  )
}

function ImageMessage() {
  return (
    <InfoMessage
      title={"An image was removed"}
      text={
        "Unfortunately, images can't be processed and therefore are removed. You have to manually re-insert the image."
      }
    />
  )
}

function Log({log}: {log: TranslationLogMessages}) {
  function renderMessage(msg: LogMessage, key: number) {
    switch (msg.type) {
      case "list":
        return (
          <ListMessage
            key={key}
            msg={msg}
          />
        )
      case "table":
        return (
          <TableMessage
            key={key}
            msg={msg}
          />
        )
      case "image":
        return <ImageMessage key={key} />
      case "error":
        return <Typography>Error: {msg.message}</Typography>
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 2,
      }}
    >
      {log.map(renderMessage)}
    </Box>
  )
}

export type TranslationLogProps = {
  translationProgress: number
  logMessages: TranslationLogMessages
  resetTranslation: () => void
}

export function TranslationLog({translationProgress, logMessages, resetTranslation}: TranslationLogProps) {
  function renderNewTranslationButton() {
    if (translationProgress >= 100) {
      return (
        <>
          <Button
            variant={"outlined"}
            onClick={resetTranslation}
          >
            New Translation
          </Button>
          {logMessages.length > 0 ? <Divider sx={{mt: 2, mb: 2}} /> : null}
        </>
      )
    }
    return null
  }

  return (
    <PageContainer
      sx={{
        alignItems: "stretch",
      }}
    >
      <TranslateStatus progress={translationProgress} />
      <Divider sx={{mt: 2, mb: 2}} />
      {renderNewTranslationButton()}
      <Log log={logMessages} />
    </PageContainer>
  )
}

export function TranslateLogProvider() {
  const {log, resetTranslation} = useAppState()

  return (
    <TranslationLog
      translationProgress={log.translationProgress}
      logMessages={log.log}
      resetTranslation={resetTranslation}
    />
  )
}
