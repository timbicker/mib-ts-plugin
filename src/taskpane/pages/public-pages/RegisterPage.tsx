import React from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import {MIBLogo} from "../../components/MIBLogo"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"

function PasswordInput({id, label}: {id: string; label: string}) {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl
      variant="outlined"
      margin="normal"
      required
      fullWidth
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  )
}

export function RegisterPageInner() {
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
          Register
        </Typography>
        <Box
          component="form"
          // onSubmit={handleSubmit}
          noValidate
          sx={{mt: 1}}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email1"
            label="Email address"
            name="email1"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email2"
            label="Repeat email address"
            name="email2"
          />
          <PasswordInput
            id={"password1"}
            label={"Password"}
          />
          <PasswordInput
            id={"password2"}
            label={"Repeat password"}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Register
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#"
                variant="body2"
              >
                Go back to log in
              </Link>
            </Grid>
            <Grid item>
              {/*<Link*/}
              {/*  href="#"*/}
              {/*  variant="body2"*/}
              {/*>*/}
              {/*  {"Don't have an account? Sign Up"}*/}
              {/*</Link>*/}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
