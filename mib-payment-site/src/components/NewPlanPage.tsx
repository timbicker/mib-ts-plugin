import {Divider, Typography, useTheme} from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import React, {useState} from "react"
import {usePaddleLoaded} from "@/state/usePaddle"
import {MuiPrice} from "@shared/MuiPrice"
import {priceInfos} from "@shared/paddle/types"
import {PageContainer} from "@/components/PageContainer"

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

function NewPlanPageInner() {
  const {state, openCheckout} = usePaddleLoaded()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly")

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
          priceMonthly={state.prices["monthly-starter"]}
          priceYearly={state.prices["yearly-starter"]}
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
          priceMonthly={state.prices["monthly-advanced"]}
          priceYearly={state.prices["yearly-advanced"]}
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
          priceMonthly={state.prices["monthly-pro"]}
          priceYearly={state.prices["yearly-pro"]}
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

export function NewPlanPage() {
  return (
    <PageContainer>
      <NewPlanPageInner />
    </PageContainer>
  )
}
