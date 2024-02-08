import {createTheme} from "@mui/material/styles"

export const mibBlack = "rgb(90,90,90)"

export const theme = createTheme({
  typography: {
    allVariants: {
      color: mibBlack,
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
