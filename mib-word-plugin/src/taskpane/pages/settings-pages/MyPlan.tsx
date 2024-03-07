import React from "react"
import {Divider, Stack} from "@mui/material"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import {MuiPrice} from "@shared/MuiPrice"

export function ChoosePlanPage() {
  return (
    <Stack
      direction={"column"}
      alignItems={"stretch"}
      justifyContent={"center"}
      pt={2}
      pl={3}
      pr={3}
      gap={2}
    >
      <MuiPrice
        title={"Standard"}
        type={"standard"}
        subheader={"Standard Variant"}
        price={"10"}
        description={["A", "B"]}
        buttonLabel={"Choose"}
      />
      <MuiPrice
        title={"Advanced"}
        type={"standard"}
        subheader={"Advanced Variant"}
        price={"30"}
        description={["A", "B"]}
        buttonLabel={"Choose"}
      />
      {/*<Plan />*/}
      {/*<Plan />*/}
      {/*<Plan />*/}
    </Stack>
  )
}

type Plan = {}

export function MyPlanPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <MuiPrice
        title={"My Plan"}
        type={"standard"}
        subheader={"Standard"}
        price={"10.99"}
        description={["A", "B"]}
        buttonLabel={"Change Plan"}
        buttonVariant={"outlined"}
      />
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

// how can I code this because I need something like a discrete state object?
export function MyPlanPageChooser({plan}: {plan?: boolean}) {
  if (!plan) return <ChoosePlanPage />
  return <MyPlanPage />
}
