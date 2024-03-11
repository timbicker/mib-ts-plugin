import {createTheme} from "@mui/material/styles"

export const mibBlack = "rgb(37,37,37)"

// Make sure these match the imported fonts from above (or vice versa)
export const fontWeightRegular = 400
export const fontWeightBold = 600

export const theme = createTheme({
  palette: {
    primary: {
      light: "#53A4DB",
      main: "#164194",
      // dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#eaf6fe",
      main: "#e1f2fd",
      // dark: "#d8eefc",
      contrastText: "#164194",
    },
    error: {
      light: "#f5b2bc",
      main: "#d2506d",
      dark: "#bf1853",
      contrastText: "#fff",
    },
    warning: {
      main: "#f7aa59",
      dark: "#f39200",
      light: "#fdd390",
      contrastText: "#fff",
    },
    info: {
      light: "#eaf6fe",
      main: "#e1f2fd",
      // dark: "#d8eefc",
      contrastText: "#164194",
    },
    success: {
      main: "#44b284",
      dark: "#00965e",
      light: "#a7d4b8",
      contrastText: "#fff",
    },
  },
  // typography: {
  //   allVariants: {
  //     color: mibBlack,
  //   },
  // },
  typography: {
    fontFamily: "Inter, sans-serif",
    allVariants: {
      letterSpacing: -0.1,
    },
    fontWeightRegular,
    fontWeightBold,
    h1: {
      fontWeight: fontWeightBold,
      fontSize: "1.7rem",
      color: mibBlack,
    },
    h2: {
      fontWeight: fontWeightBold,
      fontSize: "1.5rem",
      color: mibBlack,
    },
    h3: {
      fontSize: "1.4rem",
      color: mibBlack,
    },
    h4: {
      fontSize: "1.3rem",
    },
    h5: {
      fontSize: "1.2rem",
    },
    h6: {
      fontSize: "1.1rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: ".9rem",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        variant: "outlined",
      },
      styleOverrides: {
        root: ({theme}) =>
          theme.unstable_sx({
            pt: 1,
            pb: 1,
            pl: 2,
            pr: 2,
          }),
      },
    },
  },
})
