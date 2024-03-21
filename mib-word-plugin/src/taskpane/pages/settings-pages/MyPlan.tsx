import React from "react"
import {Divider} from "@mui/material"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import {MuiPrice} from "@shared/components/MuiPrice"

export function MyPlanPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/*<MuiPrice*/}
      {/*  title={"My Plan"}*/}
      {/*  type={"standard"}*/}
      {/*  subheader={"Standard"}*/}
      {/*  price={"10.99"}*/}
      {/*  description={["A", "B"]}*/}
      {/*  buttonLabel={"Change Plan"}*/}
      {/*  buttonVariant={"outlined"}*/}
      {/*/>*/}
      <Divider
        sx={{my: 3}}
        variant={"middle"}
      />
      <Button
        variant={"outlined"}
        sx={{
          color: "lightgrey",
          borderColor: "lightgrey",
          "&:hover": {
            color: "#c64f05",
            borderColor: "#c64f05",
            backgroundColor: "white",
          },
        }}
      >
        Cancel Subscription
      </Button>
    </Box>
  )
}

export function MyPlanPageChooser() {
  return <MyPlanPage />
}
