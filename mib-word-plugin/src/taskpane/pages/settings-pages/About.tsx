import {Box} from "@mui/system"
import Typography from "@mui/material/Typography"
import React from "react"
import Button from "@mui/material/Button"

const ContactUs = () => {
  // todo add user
  const user = {
    email: "test",
  }
  return (
    <Box>
      <Typography
        gutterBottom
        variant="body2"
      >
        Any Question?
      </Typography>
      <Button
        variant="contained"
        href={`https://znj0e09mna0.typeform.com/to/bqPhgMTv#user_email=${user.email}`}
      >
        Contact us
      </Button>
    </Box>
  )
}

export function AboutPage() {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: "24px"}}>
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
        processed exclusively on GDPR-compliant servers and deleted immediately after translation. For
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
      <ContactUs />

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
