import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#009BDF",
    },
    secondary: {
      main: "#14568D",
    },
    error: {
      main: "#FF0000",
    },
  },
  typography: {
    fontFamily: "Rubik Light, Helvetica, Arial, sans-serif",
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "green",
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "green",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          border: "1px solid white",
          textTransform: "none",
          // minWidth: "100px",
          // width: "100%",
          color: "white",
          borderBottom: "1px solid white",
          "&.Mui-selected": {
            color: "green",
            borderBottom: "1px solid green",
          },
        },
      },
    },
  },
});
