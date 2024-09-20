import { styled } from '@mui/material/styles'

export const StyledPage = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: '20px',
    padding: '50px',
  },
}))

export const FormBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px',
  border: '1px solid black',
  borderRadius: '20px',
  boxShadow: '0px 0px 5px grey',
  gap: '20px',
}))

export const SidebySide = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    gap: '20px',
  },
}))
