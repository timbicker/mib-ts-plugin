import React, {useRef} from "react"
import Typography from "@mui/material/Typography"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {Plan, User} from "../state/types"
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
import {mibGrey, mibLila} from "../theme"
import {Box} from "@mui/system"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import moment from "moment/moment"
import {useAsync} from "react-use"
import {api} from "../state/api"
import {ContactUs} from "./ContactUs"

function PlanComponent({
  plan,
  billingPeriod,
  user,
  onChangeBillingPeriod,
}: {
  plan: Plan
  user: User
  onChangeBillingPeriod: (billingPeriod: "monthly" | "yearly") => void
  billingPeriod: "monthly" | "yearly"
}) {
  const {planActive} = user
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
    <Card
      elevation={plan.planNumber * 2}
      sx={{
        bgcolor:
          planActive === plan.planNumber ? mibGrey : planActive < plan.planNumber ? mibLila : "inherit",
      }}
      // spacing={0}
      component={"div"}
    >
      <CardContent sx={{pl: 1, pt: 1, display: "flex", alignItems: "center", flexDirection: "column"}}>
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
            onChange={(_, billingPeriod) => onChangeBillingPeriod(billingPeriod)}
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
            ({(((plan.priceMonthly * 12 - plan.priceYearly) / plan.priceMonthly) * 12).toFixed(0)} % Discount)
          </Typography>
        </Box>
        <Typography variant="h5">{price(plan)}</Typography>
      </CardContent>
      <CardActions sx={{pt: 0, display: "flex", alignItems: "center", flexDirection: "column"}}>
        <Button
          href={`https://znj0e09mna0.typeform.com/to/CvUK0399#plan_name=${plan.name}&plan_price=${price(
            plan,
          )}&billing_period=${billingPeriod}&booking_type=${getBookingType(plan)}&user_name=${
            user.name
          }&isotimestamp=${moment().format("YYYY-MMDD-hhmm-ssSSS")}&user_email=${user.email}`}
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
}

export const PlansDetails = ({user}: {user: User}) => {
  const [billingPeriod, setBillingPeriod] = React.useState<"monthly" | "yearly">("monthly")
  const [plans, setPlans] = React.useState<Plan[]>([
    {
      name: "",
      features: [""],
      planNumber: 0,
      priceMonthly: 0,
      priceYearly: 0,
    },
  ])

  useAsync(async function initPlans() {
    // getPlans
    try {
      const plans = await api.getPlans()
      setPlans(plans)
    } catch (error) {
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
    }
  }, [])

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
        {plans.map((plan, ix) => (
          <PlanComponent
            billingPeriod={billingPeriod}
            onChangeBillingPeriod={setBillingPeriod}
            plan={plan}
            user={user}
            key={ix}
          />
        ))}
      </Stack>
    </Box>
  )
}
export const PlansAccordion = ({accordSumStyles, scrollToBottom, user}: any) => {
  const planRef = useRef(null)

  return (
    <Accordion
      disableGutters
      elevation={0}
      onChange={() => {
        scrollToBottom(planRef)
      }}
    >
      <AccordionSummary
        sx={accordSumStyles}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div ref={planRef} />
        <Typography>Plans</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <PlansDetails user={user} />
      </AccordionDetails>
    </Accordion>
  )
}
