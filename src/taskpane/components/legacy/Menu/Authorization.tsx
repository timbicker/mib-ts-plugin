import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import AccordionDetails from "@mui/material/AccordionDetails"
import {Box} from "@mui/system"
import React from "react"

export function Authorization({
  authRef,
  scrollToBottom,
  accordSumStyles,
  apiKeyComponent,
}: {
  authRef: any
  scrollToBottom: any
  accordSumStyles: any
  apiKeyComponent: any
}) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      onChange={() => {
        scrollToBottom(authRef)
      }}
    >
      <AccordionSummary
        sx={accordSumStyles}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div ref={authRef} />
        <Typography>Authorization</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>{apiKeyComponent}</Box>
      </AccordionDetails>
    </Accordion>
  )
}
