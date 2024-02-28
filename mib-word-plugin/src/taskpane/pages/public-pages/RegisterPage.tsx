import React, {useState} from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import {MIBLogo} from "../../components/MIBLogo"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import {FormHelperText} from "@mui/material"
import {useAuth} from "../../state/auth"

function PasswordInput({
  id,
  label,
  value,
  onChange,
  helperText,
  error,
  name,
}: {
  id: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  helperText: string
  error: boolean
  name: string
}) {
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
      error={error}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
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
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

type RegisterError = {
  passwordMatch?: true
  emailMatch?: true
  passwordStrength?: true
}

type RegisterForm = {
  email1: string
  email2: string
  password1: string
  password2: string
}

export function RegisterPageInner({
  setAuthPage,
  handleRegister,
}: {
  setAuthPage: (page: "login" | "register" | "forgot-password") => void
  handleRegister: (email: string, password: string) => Promise<void>
}) {
  const [error, setError] = useState<RegisterError>({})
  const [state, setState] = useState<RegisterForm>({
    email1: "",
    email2: "",
    password1: "",
    password2: "",
  })

  function checkError() {
    const error: RegisterError = {}
    if (state.email1 !== state.email2) {
      error.emailMatch = true
    }
    if (state.password1 !== state.password2) {
      error.passwordMatch = true
    }
    if (state.password1.length < 8) {
      error.passwordStrength = true
    }
    return error
  }

  function _handleRegister() {
    const error = checkError()
    if (Object.keys(error).length === 0) {
      handleRegister(state.email1, state.password1)
    } else {
      setError(error)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError({})
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function getPasswordHelperText() {
    if (error.passwordMatch && error.passwordStrength) {
      return "Passwords do not match, and must be at least 8 characters"
    }
    if (error.passwordMatch) {
      return "Passwords do not match"
    }
    if (error.passwordStrength) {
      return "Password must be at least 8 characters"
    }
    return ""
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
          Register
        </Typography>
        <Box sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email1"
            label="Email address"
            name="email1"
            autoFocus
            value={state.email1}
            onChange={handleChange}
            error={error.emailMatch}
            helperText={error.emailMatch ? "Emails do not match" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email2"
            label="Repeat email address"
            name="email2"
            value={state.email2}
            onChange={handleChange}
            error={error.emailMatch}
            helperText={error.emailMatch ? "Emails do not match" : ""}
          />
          <PasswordInput
            id={"password1"}
            name={"password1"}
            label={"Password"}
            value={state.password1}
            onChange={handleChange}
            helperText={getPasswordHelperText()}
            error={error.passwordMatch || error.passwordStrength}
          />
          <PasswordInput
            id={"password2"}
            name={"password2"}
            label={"Repeat password"}
            value={state.password2}
            onChange={handleChange}
            helperText={getPasswordHelperText()}
            error={error.passwordMatch || error.passwordStrength}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            onClick={_handleRegister}
          >
            Register
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Button
                onClick={() => setAuthPage("login")}
                variant="text"
              >
                Go back to log in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export function RegisterPageLoader({
  setAuthPage,
}: {
  setAuthPage: (page: "login" | "register" | "forgot-password") => void
}) {
  const {register} = useAuth()
  return (
    <RegisterPageInner
      handleRegister={register}
      setAuthPage={setAuthPage}
    />
  )
}
