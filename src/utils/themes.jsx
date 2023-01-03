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
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: 2,
        },
        root: {
          "&:hover": {
            backgroundColor: "#1D3327",
            borderWidth: 2,
          },
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

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#3D83b7",
      light: "#14eFbC",
      dark: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "#b8e16c",
      dark: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#000000",
      contrast: "#000000",
    },
    action: {
      delete: "#fa4545",
      positive: "#008f51",
      negative: "#55ccee",
      disabledBackground: "#a2a2a2",
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
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "#000000",
          borderWidth: 2,
        },
        root: {
          "&:hover": {
            backgroundColor: "#3D4367",
            color: "#ffffff",
            borderWidth: 2,
          },
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: "#000000",
    },
  },
});
