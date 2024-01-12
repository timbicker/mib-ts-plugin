import {createTheme} from "@mui/material/styles"
import {green} from "@mui/material/colors"

export const mibTürkis = "#e3f8ee"
export const mibTürkisMs = "#00aba9"
export const mibBlack = "#1d1d1b"

export const mibGrey = "#F9F9F7"

export const mibLila = "#EFF9FE"

export const mibyello = "#FDFFD0"

export const mibRed = "#FFEADD"

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 20,
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: mibBlack,
    },
    secondary: {
      main: green[500],
    },
    // alert: {
    //   info: "#fff",
    // },
  },
})
