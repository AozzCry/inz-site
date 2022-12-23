import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#3D8387",
      light: "#14BF9C",
      dark: "#212121",
    },
    secondary: {
      main: "#23415c",
      light: "#b8e16c",
      dark: "#323232",
    },
    text: {
      primary: "#e3e3e3",
      secondary: "#ffffff",
      contrast: "#030303",
    },
    action: {
      delete: "#fa8585",
      positive: "#008f51",
      negative: "#55ccee",
      disabledBackground: "#424242",
      disabled: "#000000",
    },
  },
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 900,
      pr: 1100,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: "#073b4c",
        },
      },
    },
  },

  typography: {
    allVariants: {
      color: "#e3e3e3",
    },
  },
});
