import { createTheme, responsiveFontSizes } from "@mui/material";
import { pallete } from "../styles/pallete.m";
import  typography  from "../styles/typography";

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          /* Target all scrollable elements */
          "*::-webkit-scrollbar": {
            width: "8px",
          },
          "*::-webkit-scrollbar-track": {
            background: pallete.secondary[200],
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: pallete.secondary[800],
            borderRadius: "10px",
            border: `2px solid ${pallete.secondary[200]}`,
          },
          /* Firefox scrollbar customization */
          "*": {
            scrollbarWidth: "thin",
            scrollbarColor: `${pallete.secondary[800]} ${pallete.secondary[200]}`,
          },
        },
      },
    },
  },
  direction: "rtl",
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
      main: pallete.error[400],
      light: pallete.error[300],
      dark: pallete.error[700],
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
    h1: {
      fontWeight: typography.h1.fontWeight,
      fontSize: typography.h1.fontSize,
    },
    h2: {
      fontWeight: typography.h2.fontWeight,
      fontSize: typography.h2.fontSize,
    },
    h3: {
      fontWeight: typography.h3.fontWeight,
      fontSize: typography.h3.fontSize,
    },
    h4: {
      fontWeight: typography.h4.fontWeight,
      fontSize: typography.h4.fontSize,
    },
    h5: {
      fontWeight: typography.h5.fontWeight,
      fontSize: typography.h5.fontSize,
    },
    caption: {
      fontWeight: typography.caption.fontWeight,
      fontSize: typography.caption.fontSize,
    },
    subtitle1: {
      fontWeight: typography.subtitle1.fontWeight,
      fontSize: typography.subtitle1.fontSize,
    },
    subtitle2: {
      fontWeight: typography.subtitle2.fontWeight,
      fontSize: typography.subtitle2.fontSize,
    },
    body1: {
      fontWeight: typography.body1.fontWeight,
      fontSize: typography.body1.fontSize,
    },
    body2: {
      fontWeight: typography.body2.fontWeight,
      fontSize: typography.body2.fontSize,
    },
    button: {
      fontWeight: typography.button.fontWeight,
      fontSize: typography.button.fontSize,
    },
    overline: {
      fontWeight: typography.overline.fontWeight,
      fontSize: typography.overline.fontSize,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
