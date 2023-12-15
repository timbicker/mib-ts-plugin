import React from "react"
import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"
import {useAppState} from "../state/state"
import {TranslationLog} from "../state/translationLog"
import Typography from "@mui/material/Typography"

function TranslateLoading() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box sx={{width: "100%"}}>
      <LinearProgress
        variant="determinate"
        value={progress}
      />
    </Box>
  )
}

function Log({log}: {log: TranslationLog}) {
  return (
    <Box>
      {log.map(msg => (
        <Typography>{msg}</Typography>
      ))}
    </Box>
  )
}

export function TranslateLog() {
  const {log, isTranslating} = useAppState()

  const renderLoading = () => {
    if (isTranslating !== "translating") return null
    return <TranslateLoading />
  }

  return (
    <Box>
      {renderLoading()}
      <Log log={log} />
    </Box>
  )
}
