import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import React, {PropsWithChildren} from "react"

export function TranslationPaper({title, children}: PropsWithChildren<{title: string}>) {
  return (
    <Paper>
      <Typography
        fontWeight={"bold"}
        sx={{mb: 1}}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  )
}
