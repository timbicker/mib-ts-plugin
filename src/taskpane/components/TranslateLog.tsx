import React from "react"
import Box from "@mui/material/Box"
import LinearProgress, {LinearProgressProps} from "@mui/material/LinearProgress"
import {useAppState} from "../state/state"
import {ListMessage, LogMessage, TranslationLog} from "../state/translationLog"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import {CardActionArea} from "@mui/material"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"

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

function TranslateLoading({progress}: {progress: number}) {
  if (progress === 100)
    return (
      <Box sx={{height: 18, display: "flex", justifyContent: "center"}}>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Success
        </Typography>
      </Box>
    )
  return (
    <Box sx={{pl: 4, pr: 4, height: 18}}>
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
}

function MessageCard({title, text}: {title: string; text: string}) {
  return (
    <Box sx={{maxWidth: "20rem"}}>
      <Card variant="outlined">
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="body2">{text}</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

function ListMessage() {
  // todo distinguish between table and standard case
  return (
    <MessageCard
      title={"A List was found"}
      text={
        "After translation, you might have to manually re-apply the desired format to the translated list"
      }
    />
  )
}

function TableMessage() {
  return (
    <MessageCard
      title={"A table was found"}
      text={"The table was left as-is"}
    />
  )
}

function ImageMessage() {
  return (
    <MessageCard
      title={"An image was found"}
      text={
        "Images can't be processed and it was therefore removed. You have to manually re-insert the image."
      }
    />
  )
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 4,
      }}
    >
      {log.map(renderMessage)}
    </Box>
  )
}

export function TranslateLog() {
  const {log, isTranslating} = useAppState()

  const renderLoading = () => {
    if (isTranslating !== "translating" && isTranslating !== "success") return null
    return <TranslateLoading progress={log.translationProgress} />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexAlign: "stretch",
        pt: 4,
        gap: 4,
        pl: 2,
        pr: 2,
      }}
    >
      {renderLoading()}
      <Log log={log.log} />
      <Box sx={{height: 4}} />
    </Box>
  )
}
