import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#718ab2",
      light: "#03F090",
      dark: "#073b4c",
    },
    secondary: {
      main: "#251f47",
      light: "#f8e16c",
      dark: "#43415c",
    },
    text: {
      primary: "#e3e3e3",
      secondary: "#ffffff",
      contrast: "#030303",
    },
    action: {
      delete: "#fa8585",
      positive: "#00ff11",
      negative: "#55ccee",
    },
  },
  breakpoints: {
    values: {
      xs: 400,
      sm: 600,
      md: 900,
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "#073b4c",
        },
      },
    },
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
