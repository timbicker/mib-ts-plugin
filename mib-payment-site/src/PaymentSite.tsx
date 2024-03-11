import React, {useEffect, useState} from "react"
import Box from "@mui/material/Box"
import {PaddleState, usePaddle, UsePaddleResponse} from "@/usePaddle"
import Button from "@mui/material/Button"
import {Divider, Link, Typography, useTheme} from "@mui/material"
import {MIBLogo} from "@shared/MIBLogo"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import {MuiPrice} from "@shared/MuiPrice"
import {priceInfos} from "@shared/paddle/types"

function BillingPeriodButtons({
  onMonthly,
  onYearly,
  billingCycle,
}: {
  onMonthly: () => void
  onYearly: () => void
  billingCycle: "monthly" | "yearly"
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
    if (billingCycle === "yearly") {
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
        sx={buttonStyles(billingCycle === "monthly")}
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
          ...buttonStyles(billingCycle === "yearly"),
          // ml: 2,
        }}
      >
        Yearly
      </Button>
      <FormControlLabel
        sx={{
          color: billingCycle === "monthly" ? "grey" : theme.palette.success.main,
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
            checked={billingCycle === "yearly"}
            color={billingCycle === "monthly" ? "error" : "success"}
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

function PaymentSiteInner({
  paddleState,
  openCheckout,
}: {
  paddleState: Extract<PaddleState, {type: "loaded"}>
  openCheckout: UsePaddleResponse["openCheckout"]
}) {
  const theme = useTheme()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <>
      <Typography variant={"h1"}>Choose your plan</Typography>
      <BillingPeriodButtons
        billingCycle={billingCycle}
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
          priceMonthly={paddleState.prices["monthly-starter"]}
          priceYearly={paddleState.prices["yearly-starter"]}
          description={priceInfos["monthly-starter"].info}
          buttonLabel={"Choose"}
          buttonVariant={"contained"}
          onButtonClick={() => {
            if (billingCycle === "monthly") return openCheckout({priceType: "monthly-starter"})
            return openCheckout({priceType: "yearly-starter"})
          }}
        />
        <MuiPrice
          title={"Advanced"}
          billingCycle={billingCycle}
          priceMonthly={paddleState.prices["monthly-advanced"]}
          priceYearly={paddleState.prices["yearly-advanced"]}
          description={priceInfos["monthly-advanced"].info}
          buttonLabel={"Choose"}
          buttonVariant={"contained"}
          onButtonClick={() => {
            if (billingCycle === "monthly") return openCheckout({priceType: "monthly-advanced"})
            return openCheckout({priceType: "yearly-advanced"})
          }}
        />
        <MuiPrice
          title={"Pro"}
          billingCycle={billingCycle}
          priceMonthly={paddleState.prices["monthly-pro"]}
          priceYearly={paddleState.prices["yearly-pro"]}
          description={priceInfos["monthly-pro"].info}
          buttonLabel={"Choose"}
          buttonVariant={"contained"}
          onButtonClick={() => {
            if (billingCycle === "monthly") return openCheckout({priceType: "monthly-pro"})
            return openCheckout({priceType: "yearly-pro"})
          }}
        />
      </Box>
      <Box className={"checkout-container"} />
    </>
  )
}

export function PaymentSiteContainer() {
  const {openCheckout, state} = usePaddle()
  const theme = useTheme()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  useEffect(() => {
    // if (paddle) openCheckout()
  }, [state])

  function renderContent() {
    if (state.type === "loading") return <Typography variant={"h1"}>Choose your plan</Typography>
    if (state.type === "error") return <Typography variant={"h1"}>Choose your plan</Typography>
    return (
      <PaymentSiteInner
        paddleState={state}
        openCheckout={openCheckout}
      />
    )
  }

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
        <Typography>
          <Link color={theme.palette.primary.contrastText}>Read more</Link>
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 24,
          ml: 8,
          mr: 8,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  )
}
