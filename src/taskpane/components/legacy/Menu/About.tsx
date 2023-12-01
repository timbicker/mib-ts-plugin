import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import AccordionDetails from "@mui/material/AccordionDetails"
import {Box} from "@mui/system"
import {ContactUs} from "../ContactUs"
import React from "react"

export function AboutDetails({user}: {user: any}) {
  return (
    <Box sx={{m: 2, display: "flex", flexDirection: "column", gap: "24px"}}>
      <Typography
        variant="body1"
        gutterBottom
      >
        Make It Bilingual! helps you to create bilingual versions of your (legal) documents - in the blink of
        an eye. Save yourself hours of translation and formatting work and boost your international business.
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        The app operates according to the highest data protection and confidentiality standards: Your data is
        processed exclusively on DSGVO-compliant servers and deleted immediately after translation. For
        translation, we use the DeepL engine, which is committed to complying with the above standards.
      </Typography>
      <Typography variant="body1">
        Make It Bilingual! Word Add-in is brought to you by{" "}
        <Typography
          fontWeight={600}
          component="span"
          variant="body1"
        >
          Resolvio GmbH
        </Typography>
      </Typography>
      <ContactUs user={user} />

      <Box>
        <Typography variant="body1">info@makeitbilingual.com</Typography>
        <br />
        <Typography variant="body1">Resolvio GmbH</Typography>
        <Typography variant="body1">Emser Straße 119</Typography>
        <Typography variant="body1">56076 Koblenz</Typography>
        <Typography variant="body1">Germany</Typography>
        <br />
        <Typography variant="body1">Director: Hubertus Scherbarth, Rechtsanwalt, Steuerberater</Typography>
        <br />
        <Typography variant="body1">Register court: Amtsgericht Koblenz, Germany</Typography>
        <Typography variant="body1">Register number: HRB 29071</Typography>
      </Box>
    </Box>
  )
}
export function AboutAccordion({
  aboutRef,
  accordSumStyles,
  user,
  scrollToBottom,
}: {
  aboutRef: any
  accordSumStyles: any
  user: any
  scrollToBottom: any
}) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      onChange={() => {
        scrollToBottom(aboutRef)
      }}
    >
      <AccordionSummary
        sx={accordSumStyles}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div ref={aboutRef} />
        <Typography>About</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AboutDetails user={user} />
      </AccordionDetails>
    </Accordion>
  )
}
