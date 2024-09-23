import { styled } from '@mui/material/styles' 

export const SideBySideBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  }))
  