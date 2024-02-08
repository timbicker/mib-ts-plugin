import React from "react"
import {Stack} from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CardHeader from "@mui/material/CardHeader"
import Grid from "@mui/material/Grid"
import StarIcon from "@mui/icons-material/StarBorder"

function MuiPrice({
  title,
  type,
  subheader,
  price,
  description,
}: {
  title: string
  type: "pro" | "standard"
  subheader: string
  price: string
  description: string[]
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
            variant={"contained"}
          >
            Choose
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

function Plan() {
  return (
    <Card>
      <CardContent>
        <Typography>Hello</Typography>
      </CardContent>
      <CardActions>
        <Button variant={"contained"}>Choose</Button>
      </CardActions>
    </Card>
  )
}

export function ChoosePlanPageRedirectInner() {
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      pt={2}
      pl={3}
      pr={3}
      gap={2}
    >
      <Typography sx={{mt: 12, mb: 2}}>You have no active plan.</Typography>
      <Button
        variant={"contained"}
        sx={{alignSelf: "stretch"}}
      >
        Book a plan
      </Button>
    </Stack>
  )
}

export function ChoosePlanPageInner() {
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
      />
      <MuiPrice
        title={"Advanced"}
        type={"standard"}
        subheader={"Advanced Variant"}
        price={"30"}
        description={["A", "B"]}
      />
      {/*<Plan />*/}
      {/*<Plan />*/}
      {/*<Plan />*/}
    </Stack>
  )
}
