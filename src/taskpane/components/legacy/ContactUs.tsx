import {Box, Button, Typography} from "@mui/material"
import React from "react"

export const ContactUs = ({user}: any) => {
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
