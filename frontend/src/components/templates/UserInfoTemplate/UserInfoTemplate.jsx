import React from 'react'
import { StyledPage, FormBox, SidebySide } from './UserInfoTemplate.styles'
import TextField from '../../atoms/TextField'
import Button from '../../atoms/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers'
import MenuItem from '@mui/material/MenuItem'
import { Majors } from './arrays/majors'
import { ShirtSizes } from './arrays/shirts'
import Autocomplete from '@mui/material/Autocomplete'

const UserInfoTemplate = (props) => {
  return (
    <StyledPage>
      <FormBox>
        <Typography variant="h4">New User Form</Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'left' }}>
          <Typography variant="h6">Personal Information</Typography>
        </Box>
        <SidebySide>
          <TextField required label="First Name" />
          <TextField required label="Last Name" />
        </SidebySide>
        <SidebySide>
          <TextField required label="UIN" />
          <TextField required label="Email" />
        </SidebySide>
        <SidebySide>
          <TextField required label="Phone Number" />
          <Autocomplete
            // disablePortal
            freeSolo
            options={Majors}
            getOptionLabel={(option) => option.value}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                sx={{ width: '200px' }}
                label="Major"
              />
            )}
          />{' '}
        </SidebySide>
        <SidebySide>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField required label="Birthday" />
          </LocalizationProvider>
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Shirt Size"
            placeholder="Select a size"
            sx={{ width: '200px' }}
          >
            {ShirtSizes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </SidebySide>

        <Button variant="contained">Submit</Button>
      </FormBox>
    </StyledPage>
  )
}

export default UserInfoTemplate
