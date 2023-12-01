import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {FormControl} from "@mui/material"

export default function ApiInput({apiKeyInput, handleApiKeyInput, authorized}: any) {
  return (
    <Box
      component="form"
      //   sx={{
      //     '& > :not(style)': { m: 1, width: '25ch' },
      //   }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{m: 1, width: "100%"}}>
        <TextField
          error={authorized ? false : true}
          id="outlined-name"
          label="Make It Bilingual Key"
          value={apiKeyInput}
          onChange={handleApiKeyInput}
        />
      </FormControl>
    </Box>
  )
}
