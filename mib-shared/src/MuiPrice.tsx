import {ButtonProps} from "@mui/material"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import StarIcon from "@mui/icons-material/StarBorder"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import React from "react"

export function MuiPrice({
  title,
  priceMonthly,
  priceYearly,
  billingCycle,
  description,
  buttonLabel,
  buttonVariant = "contained",
  onButtonClick,
}: {
  title: string
  billingCycle: "monthly" | "yearly"
  priceMonthly: string
  priceYearly: string
  description: string[]
  buttonLabel: string
  buttonVariant?: ButtonProps["variant"]
  onButtonClick?: () => void
}) {
  function billingCycleText() {
    if (billingCycle === "monthly") return "per month"
    return "per month"
  }

  function price() {
    if (billingCycle === "monthly") return priceMonthly
    return Math.floor(parseInt(priceYearly) / 12)
  }

  function savedAmount() {
    if (billingCycle === "monthly") return null
    const diff = parseInt(priceMonthly) * 12 - parseInt(priceYearly)
    return (
      <Typography sx={theme => ({color: theme.palette.success.main})}>
        You save {`${diff}`}$ per year.
      </Typography>
    )
  }

  function billedYearly() {
    if (billingCycle === "monthly") return <Typography sx={{fontSize: "0.85rem"}}>billed monthly</Typography>
    return <Typography sx={{fontSize: "0.85rem"}}>billed yearly</Typography>
  }

  return (
    <Grid
      sx={{
        flexGrow: 1,
        width: 280,
        maxWidth: 280,
      }}
      item
      key={title}
      xs={12}
      sm={title === "Enterprise" ? 12 : 6}
      md={4}
    >
      <Card>
        <CardHeader
          title={title}
          sx={theme => ({
            color: theme.palette.text.primary,
          })}
          // subheader={subheader}
          titleTypographyProps={{color: "inherit", fontWeight: "bold", variant: "h3"}}
          // action={type === "pro" ? <StarIcon /> : null}
          subheaderTypographyProps={{
            align: "center",
          }}
        />
        <CardContent sx={{pt: 0}}>
          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "baseline",
              // mb: 2,
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: "1.8rem",
              }}
              color={theme => theme.palette.text.primary}
            >
              ${price()}
            </Typography>
            <Typography
              variant="h6"
              color={theme => theme.palette.text.secondary}
            >
              &nbsp;{billingCycleText()}
            </Typography>
          </Box>
          {/*{savedAmount()}*/}
          {billedYearly()}
          <Box
            component={"ul"}
            sx={{
              pl: 2,
            }}
          >
            {description.map(line => (
              <Typography
                component="li"
                variant="subtitle1"
                // align="center"
                key={line}
              >
                {line}
              </Typography>
            ))}
          </Box>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant={buttonVariant}
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export function MuiPriceOld({
  title,
  type,
  subheader,
  price,
  description,
  buttonLabel,
  buttonVariant = "contained",
}: {
  title: string
  type: "pro" | "standard"
  subheader: string
  price: string
  description: string[]
  buttonLabel: string
  buttonVariant?: ButtonProps["variant"]
}) {
  return (
    <Grid
      item
      key={title}
      xs={12}
      sm={title === "Enterprise" ? 12 : 6}
      md={4}
    >
      <Card>
        <CardHeader
          title={title}
          subheader={subheader}
          titleTypographyProps={{align: "center"}}
          action={type === "pro" ? <StarIcon /> : null}
          subheaderTypographyProps={{
            align: "center",
          }}
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[700],
          }}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              mb: 2,
            }}
          >
            <Typography
              component="h2"
              variant="h4"
              color="text.primary"
            >
              ${price}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
            >
              /mo
            </Typography>
          </Box>
          <ul>
            {description.map(line => (
              <Typography
                component="li"
                variant="subtitle1"
                align="center"
                key={line}
              >
                {line}
              </Typography>
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant={buttonVariant}
          >
            {buttonLabel}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
