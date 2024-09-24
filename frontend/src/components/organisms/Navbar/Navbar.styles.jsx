import { styled } from '@mui/material/styles' 

export const StyledNavbar = styled('div')(({ theme }) => ({
  boxShadow: `0px 0.7px 0.7px hsl(var(--shadow-color) / 0.37),
    0px 1.4px 1.3px -0.9px hsl(var(--shadow-color) / 0.33),
    0px 3px 2.9px -1.8px hsl(var(--shadow-color) / 0.28),
    0px 6.6px 6.3px -2.7px hsl(var(--shadow-color) / 0.24),
    -0.1px 13.4px 12.9px -3.6px hsl(var(--shadow-color) / 0.19)`
}))