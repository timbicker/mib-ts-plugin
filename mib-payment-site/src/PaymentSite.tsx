import React, {useEffect, useState} from "react"
import Box from "@mui/material/Box"
import {usePaddle} from "@/usePaddle"
import Button from "@mui/material/Button"
import {Divider, Typography, useTheme} from "@mui/material"
import {MIBLogo} from "@shared/MIBLogo"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import {MuiPrice} from "@shared/MuiPrice"

function BillingPeriodButtons({
  onMonthly,
  onYearly,
  state,
}: {
  onMonthly: () => void
  onYearly: () => void
  state: "monthly" | "yearly"
}) {
  const theme = useTheme()
  function buttonStyles(active: boolean) {
    if (active)
      return {
        outline: "2px solid",
        border: "0",
        ":hover": {
          border: "0",
          outline: "2px solid",
        },
      }
    return {
      color: "grey",
      border: "0",
      outline: "1px solid grey",
      ":hover": {
        border: "0",
        outline: "2px solid grey",
      },
    }
  }

  function handleCheckboxClick() {
    if (state === "yearly") {
      onMonthly()
    }
    onYearly()
  }
  return (
    <Box
      sx={{
        display: "flex",
        my: 4,
        pl: 1,
        py: 2,
        // gap: 2,
        alignItems: "center",
      }}
    >
      <Button
        variant={"outlined"}
        size={"small"}
        sx={buttonStyles(state === "monthly")}
        onClick={onMonthly}
      >
        Monthly
      </Button>
      <Divider
        orientation="vertical"
        // variant="middle"
        flexItem
        sx={{mx: 2, color: "grey", my: "2px"}}
      />
      <Button
        variant={"outlined"}
        size={"small"}
        onClick={onYearly}
        sx={{
          ...buttonStyles(state === "yearly"),
          // ml: 2,
        }}
      >
        Yearly
      </Button>
      <FormControlLabel
        sx={{
          color: state === "monthly" ? "grey" : theme.palette.success.main,
          ml: 1,
        }}
        componentsProps={{
          typography: {
            fontSize: "0.9rem",
            ml: "2px",
          },
        }}
        control={
          <Checkbox
            sx={{color: "inherit", p: 0}}
            checked={state === "yearly"}
            color={state === "monthly" ? "error" : "success"}
            disableRipple
            // onClick={handleCheckboxClick}
            onChange={handleCheckboxClick}
          />
        }
        label="Save 20% with yearly"
      />
    </Box>
  )
}

export function PaddleModal() {
  const {openCheckout, state} = usePaddle()
  const theme = useTheme()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  useEffect(() => {
    // if (paddle) openCheckout()
  }, [state])

  return (
    <Box
      sx={{
        display: "grid",
        height: "100vh",
        gridTemplateColumns: "min(33vw, 500px) 1fr",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.dark,
          p: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <MIBLogo color={"white"} />
        <Typography
          sx={{
            mt: 4,
            width: 300,
          }}
          color={theme.palette.primary.contrastText}
        >
          Make it bilingual works together with paddle to process payments worldwide.
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 24,
          ml: 8,
          mr: 8,
        }}
      >
        {/*<HorizontalLinearStepper />*/}
        {/*<Button onClick={getPrices}>Get Prices</Button>*/}
        <Typography variant={"h1"}>Choose your plan</Typography>
        <BillingPeriodButtons
          state={billingCycle}
          onMonthly={() => setBillingCycle("monthly")}
          onYearly={() => setBillingCycle("yearly")}
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <MuiPrice
            title={"Starter"}
            billingCycle={billingCycle}
            price={"20"}
            description={["A", "B"]}
            buttonLabel={"Choose"}
            buttonVariant={"outlined"}
          />
          <MuiPrice
            title={"Advanced"}
            billingCycle={billingCycle}
            price={"20"}
            description={["A", "B"]}
            buttonLabel={"Choose"}
            buttonVariant={"outlined"}
          />
          <MuiPrice
            title={"Pro"}
            billingCycle={billingCycle}
            price={"20"}
            description={["A", "B"]}
            buttonLabel={"Choose"}
            buttonVariant={"outlined"}
          />
        </Box>
        <Box className={"checkout-container"} />
        <Button onClick={openCheckout}>Open Checkout</Button>
      </Box>
    </Box>
  )
}
