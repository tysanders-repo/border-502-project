import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 3),

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[2],
  },

  '&:active': {
    backgroundColor: theme.palette.primary.light,
    boxShadow: theme.shadows[3],
  },
}))
