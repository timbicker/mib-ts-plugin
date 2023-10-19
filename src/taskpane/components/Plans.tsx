import React, {useRef} from "react"
import Typography from "@mui/material/Typography"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {PlansDetails} from "./PlansDetails.jsx"

export const Plans = ({planActive, accordSumStyles, scrollToBottom, user}: any) => {
  const planRef = useRef(null)

  return (
    <Accordion
      disableGutters
      elevation={0}
      onChange={() => {
        scrollToBottom(planRef)
      }}
    >
      <AccordionSummary
        sx={accordSumStyles}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div ref={planRef} />
        <Typography>Plans</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <PlansDetails
          planActive={planActive}
          user={user}
        />
      </AccordionDetails>
    </Accordion>
  )
}
