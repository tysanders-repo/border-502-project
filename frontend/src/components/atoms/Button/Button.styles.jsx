import { styled } from '@mui/material/styles'

export const StyledButton = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Background color from the theme
  color: theme.palette.primary.contrastText, // Text color from the theme
  padding: theme.spacing(1.5, 3), // Padding from the theme
  borderRadius: theme.shape.borderRadius, // Border radius from the theme
  boxShadow: theme.shadows[2], // Box shadow from the theme
  textAlign: 'center', // Center the text
  cursor: 'pointer', // Pointer cursor to indicate it's clickable
  display: 'inline-block', // Make it fit content
  fontSize: theme.typography.fontSize, // Font size from the theme
  fontWeight: theme.typography.fontWeightMedium, // Font weight from the theme

  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Darker background color on hover
    boxShadow: theme.shadows[4], // Increase shadow on hover
  },

  '&:active': {
    backgroundColor: theme.palette.primary.light, // Lighter background color on click
  },
}))
