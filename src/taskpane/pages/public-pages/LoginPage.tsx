import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {MIBLogo} from "../../components/MIBLogo"
import {useAuth} from "../../state/auth"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://mui.com/"
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export function LoginPageInner({
  setAuthPage,
  login,
}: {
  login: (user: string, password: string) => Promise<void>
  setAuthPage: (page: "login" | "register" | "forgot-password") => void
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    login(data.get("email") as string, data.get("password") as string)
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // })
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MIBLogo sx={{mb: 8}} />
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{mt: 1}}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3}}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant={"outlined"}
            sx={{mt: 1, mb: 2}}
            onClick={() => setAuthPage("register")}
          >
            Register
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Button
                onClick={() => setAuthPage("forgot-password")}
                variant="text"
              >
                Forgot password?
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 8, mb: 4}} />
    </Container>
  )
}

export function LoginPageLoader({
  setAuthPage,
}: {
  setAuthPage: (page: "login" | "register" | "forgot-password") => void
}) {
  const {logIn} = useAuth()
  return (
    <LoginPageInner
      setAuthPage={setAuthPage}
      login={logIn}
    />
  )
}
