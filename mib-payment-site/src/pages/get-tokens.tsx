import {PageContainer} from "@/components/PageContainer"
import {TextField, Typography} from "@mui/material"
import React, {ChangeEvent, useState} from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import ButtonGroup from "@mui/material/ButtonGroup"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {paddleHandler} from "@/state/paddleHandler"

function GetTokensPage() {
  const [amountValue, setAmountValue] = useState<number | undefined>(1)

  const tier = "pro"
  const billingCycle = "monthly"
  const activeSubscription = paddleHandler.getSubscriptionInfo(tier, billingCycle)
  const amount = amountValue ?? 0

  const price = amount * activeSubscription.token.price
  const characters = amount * activeSubscription.token.characters
  const pages = amount * activeSubscription.numTokenPages()

  function handleChangeAmount(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    if (newValue === "") {
      setAmountValue(undefined)
      return
    }
    const number = parseInt(newValue)
    if (isNaN(number)) return
    if (number < 1) return
    if (number > 99) return
    setAmountValue(number)
  }

  function incAmount() {
    setAmountValue(old => {
      if (old === undefined) return 1
      if (old === 99) return old
      return old + 1
    })
  }

  function decAmount() {
    setAmountValue(old => {
      if (old === undefined) return 1
      if (old === 1) return old
      return old - 1
    })
  }

  return (
    <>
      <Typography variant={"h1"}>Get more tokens</Typography>
      <Typography sx={{my: 3}}>You are on the plan: Advanced</Typography>
      <Box
        sx={{
          display: "flex",
          my: 3,
        }}
      >
        <TextField
          label={"Amount"}
          onChange={handleChangeAmount}
          value={amountValue ?? ""}
          variant={"outlined"}
          sx={{width: 100}}
        />
        <ButtonGroup size="small">
          <Button onClick={incAmount}>
            <KeyboardArrowUpIcon fontSize="medium" />
          </Button>
          <Button onClick={decAmount}>
            <KeyboardArrowDownIcon fontSize="medium" />
          </Button>
        </ButtonGroup>
      </Box>
      <Typography></Typography>
      <Grid
        sx={{
          flexGrow: 1,
          width: 280,
          maxWidth: 280,
        }}
        item
        xs={12}
        sm={6}
        md={4}
      >
        <Card>
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
                ${price}
              </Typography>
            </Box>
            <Typography>{characters} characters</Typography>
            <Typography>Approx {pages} pages</Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant={"contained"}
              // onClick={onButtonClick}
            >
              get
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default function GetTokens() {
  return (
    <PageContainer>
      <GetTokensPage />
    </PageContainer>
  )
}
