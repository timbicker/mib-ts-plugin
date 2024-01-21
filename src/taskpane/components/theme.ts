import {createTheme} from "@mui/material/styles"

export const theme = createTheme({
  typography: {
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
