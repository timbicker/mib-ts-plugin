import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import React from "react"
import Typography from "@mui/material/Typography"
import {Box} from "@mui/system"
import moment from "moment"
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import axios from "axios"
import {useEffect} from "react"
import {mibGrey, mibLila} from "../theme"
import {ContactUs} from "./ContactUs"
import {host} from "./App"

export const PlansDetails = ({planActive, user}: any) => {
  const [billingPeriod, setBillingPeriod] = React.useState("monthly")
  const [plans, setPlans] = React.useState([
    {
      name: "",
      features: [""],
      planNumber: 0,
      priceMonthly: 0,
      priceYearly: 0,
    },
  ])

  const handleChange = (_, newBillingPeriod) => {
    setBillingPeriod(newBillingPeriod)
  }

  useEffect(() => {
    // getPlans
    axios
      .get(`${host}/api/v1/getplans`)
      .then(response => {
        setPlans(response.data)
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message)
        }
        console.log(error.config)
      })
  }, [])

  const billingPeriods = {
    monthly: {value: "monthly", unit: "€ / month"},
    yearly: {value: "yearly", unit: "€ / year"},
  }

  const price = plan => `${
    billingPeriod === billingPeriods.monthly.value
      ? plan.priceMonthly.toLocaleString()
      : billingPeriod === billingPeriods.yearly.value
      ? plan.priceYearly.toLocaleString()
      : ""
  } 
  ${
    billingPeriod === billingPeriods.monthly.value
      ? billingPeriods.monthly.unit
      : billingPeriod === billingPeriods.yearly.value
      ? billingPeriods.yearly.unit
      : ""
  }`

  const getBookingType = plan =>
    planActive > plan.planNumber ? "downgrade" : planActive < plan.planNumber ? "upgrade" : "book"

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: "12px"}}>
      <Typography variant="body2">
        Book and manage your plans here. Choose between yearly and monthly billing period.
      </Typography>
      <ContactUs user={user} />

      <Stack
        sx={{mt: "12px"}}
        direction="column"
        spacing={3}
      >
        {plans.map((plan, ix) => {
          return (
            <Card
              key={ix}
              elevation={plan.planNumber * 2}
              sx={{
                bgcolor:
                  planActive === plan.planNumber
                    ? mibGrey
                    : planActive < plan.planNumber
                    ? mibLila
                    : "inherit",
              }}
              // spacing={0}
              component={"div"}
            >
              <CardContent
                sx={{pl: 1, pt: 1, display: "flex", alignItems: "center", flexDirection: "column"}}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    mb: "12px",
                  }}
                >
                  <ToggleButtonGroup
                    size="small"
                    color="primary"
                    value={billingPeriod}
                    exclusive
                    onChange={handleChange}
                    aria-label="Billing period"
                  >
                    <ToggleButton value="monthly">Monthly</ToggleButton>
                    <ToggleButton value="yearly">Yearly</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Badge
                  badgeContent={planActive === plan.planNumber ? "Active Plan" : 0}
                  color="secondary"
                >
                  <Typography
                    sx={{fontWeight: 600}}
                    variant="body1"
                    align="center"
                  >
                    {plan.name}
                  </Typography>
                </Badge>

                <List dense>
                  {plan.features.map((feature, ix) => {
                    return (
                      <ListItem key={ix}>
                        <ListItemIcon>
                          <CheckCircleIcon color={"success"} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    )
                  })}
                </List>
                <Box
                  sx={{
                    display: billingPeriod === billingPeriods.yearly.value ? "flex" : "none",
                    flexDirection: "row",
                    gap: "6px",
                  }}
                >
                  <Typography
                    sx={{textDecoration: "line-through"}}
                    component="span"
                    variant="subtitle2"
                  >
                    {(plan.priceMonthly * 12).toLocaleString(undefined, {minimumFractionDigits: 2})} €{" "}
                  </Typography>
                  <Typography
                    component="span"
                    variant="subtitle2"
                  >
                    ({(((plan.priceMonthly * 12 - plan.priceYearly) / plan.priceMonthly) * 12).toFixed(0)} %
                    Discount)
                  </Typography>
                </Box>
                <Typography variant="h5">{price(plan)}</Typography>
              </CardContent>
              <CardActions sx={{pt: 0, display: "flex", alignItems: "center", flexDirection: "column"}}>
                <Button
                  href={`https://znj0e09mna0.typeform.com/to/CvUK0399#plan_name=${
                    plan.name
                  }&plan_price=${price(plan)}&billing_period=${billingPeriod}&booking_type=${getBookingType(
                    plan,
                  )}&user_name=${user.name}&isotimestamp=${moment().format(
                    "YYYY-MMDD-hhmm-ssSSS",
                  )}&user_email=${user.email}`}
                  variant={planActive > plan.planNumber ? undefined : "contained"}
                  disabled={planActive === plan.planNumber ? true : false}
                  color="info"
                  size="large"
                >
                  {planActive > plan.planNumber
                    ? "Downgrade to this plan"
                    : planActive < plan.planNumber
                    ? "Upgrade to this plan"
                    : "Book this plan"}
                </Button>
              </CardActions>
            </Card>
          )
        })}
      </Stack>
    </Box>
  )
}
