import { createTheme } from '@mui/material/styles'

const customPalette = {
  primary: {
    main: '#085eb3',
    light: '#3b77b3',
    dark: '#003f7d',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#700101',
    light: '#942f2f',
    dark: '#3d0000',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f5f5f5',
  },
  text: {
    primary: '#333333',
  },
}
const theme = createTheme({
  palette: customPalette,
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Default font family
    h1: {
      fontFamily: 'Lora, serif', // Specific font for h1
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Open Sans, sans-serif', // Specific font for h2
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'Roboto, Arial, sans-serif', // Specific font for h3
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: 'Roboto, Arial, sans-serif', // Specific font for body1
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: 'Open Sans, sans-serif', // Specific font for body2
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
        },
      },
    },
  },
})

export default theme
