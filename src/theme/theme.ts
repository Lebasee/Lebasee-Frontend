import { createTheme } from "@mui/material";
import { pallete } from "../styles/pallete.m";
import { typography } from "../styles/typography";

const theme = createTheme({
  palette: {
    primary: {
      main: pallete.primary[500],
      light: pallete.primary[300],
      dark: pallete.primary[700],
    },
    secondary: {
      main: pallete.secondary[500],
      light: pallete.secondary[300],
      dark: pallete.secondary[700],
    },
    success: {
      main: pallete.success[500],
      light: pallete.success[300],
      dark: pallete.success[700],
    },
    warning: {
      main: pallete.warning[500],
      light: pallete.warning[300],
      dark: pallete.warning[700],
    },
    error: {
      main: pallete.error[500],
      light: pallete.error[300],
      dark: pallete.error[700],
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
  },
});

export default theme;
