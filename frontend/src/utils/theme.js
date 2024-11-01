import { createTheme } from "@mui/material/styles";

const customPalette = {
  primary: {
    main: "#700101",
    light: "#942f2f",
    dark: "#3d0000",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#085eb3",
    light: "#3b77b3",
    dark: "#003f7d",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f5f5f5",
  },
  text: {
    primary: "#333333",
  },
};
const theme = createTheme({
  palette: customPalette,
  typography: {
    fontFamily: "Oswald, Arial, sans-serif",
    h1: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "2.5rem",
      fontWeight: 800,
      lineHeight: 1.2,
      textTransform: "uppercase",
    },
    h2: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: "Roboto Condensed, sans-serif",
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
        },
      },
    },
  },
});

export default theme;
