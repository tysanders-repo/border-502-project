import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  'input:-webkit-autofill': {
    WebkitBoxShadow: `0 0 0 1000px ${theme.palette.common.white} inset`, 
    backgroundColor: `${theme.palette.common.white} !important`, 
  },
}));