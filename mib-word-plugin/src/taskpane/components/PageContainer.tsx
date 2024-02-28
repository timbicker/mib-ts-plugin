import React, {PropsWithChildren} from "react"
import {StackProps} from "@mui/material"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

export function PageContainer({children, ...props}: PropsWithChildren<StackProps>) {
  return (
    <Stack
      direction={"column"}
      pt={2}
      pl={3}
      pr={3}
      {...props}
    >
      {children}
      <Box sx={{minHeight: 20}} />
    </Stack>
  )
}
