import React from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"

export function ContactUsPage() {
  return (
    <Box>
      <Typography>To contact us, send us an e-mail to:</Typography>
      <Typography sx={{mt: 1}}>
        <Link href={"mailto:info@makeitbilingual.com"}>info@makeitbilingual.com</Link>
      </Typography>
    </Box>
  )
}
