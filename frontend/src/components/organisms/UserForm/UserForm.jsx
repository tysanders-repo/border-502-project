import React from 'react'
import { TextField, Button, CircularProgress, Alert, Box } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'
import { SideBySideBox } from './UserForm.styles'

import { Majors } from '../../../utils/arrays/majors'
import { ShirtSizes } from '../../../utils/arrays/shirts'

const UserForm = ({
  user,
  loading,
  error,
  formError,
  onChange,
  onSubmit,
  handleCancel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <SideBySideBox>
          <TextField
            required
            label="First Name"
            variant="outlined"
            fullWidth
            value={user.first_name}
            onChange={(e) => onChange('first_name', e.target.value)}
            error={formError.first_name}
            helperText={formError.first_name ? 'First Name is required' : ''}
          />
          <TextField
            required
            label="Last Name"
            variant="outlined"
            fullWidth
            value={user.last_name}
            onChange={(e) => onChange('last_name', e.target.value)}
            error={formError.last_name}
            helperText={formError.last_name ? 'Last Name is required' : ''}
          />
        </SideBySideBox>

        <SideBySideBox>
          <TextField
            required
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={user.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            error={formError.phone}
            helperText={formError.phone ? 'Phone Number is required' : ''}
          />
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth
            value={user.email}
            onChange={(e) => onChange('email', e.target.value)}
            error={formError.email}
            helperText={formError.email ? 'Valid Email is required' : ''}
          />
        </SideBySideBox>

        <Autocomplete
          freeSolo
          options={Majors}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.value
          }
          value={user.major}
          onChange={(e, newValue) => onChange('major', newValue?.value || '')}
          renderInput={(params) => (
            <TextField required {...params} label="Major" />
          )}
        />

        <SideBySideBox>
          <TextField
            required
            label="UIN"
            variant="outlined"
            fullWidth
            type="number"
            value={user.uin}
            onChange={(e) => onChange('uin', e.target.value)}
            error={formError.uin}
            helperText={formError.uin ? 'Valid UIN is required' : ''}
          />

          <TextField
            required
            label="Graduation Year"
            variant="outlined"
            fullWidth
            value={user.year}
            onChange={(e) => onChange('year', e.target.value)}
            error={formError.year}
            helperText={formError.year ? 'Year is required' : ''}
          />
        </SideBySideBox>

        <TextField
          id="outlined-select-currency"
          select
          required
          label="Shirt Size"
          value={user.tshirt_size}
          onChange={(e) => onChange('tshirt_size', e.target.value)}
          placeholder="Select a size"
          sx={{ width: '100%', textAlign: 'left' }}
        >
          {ShirtSizes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Birthday"
          variant="outlined"
          fullWidth
          type="date"
          value={user.birthday}
          onChange={(e) => onChange('birthday', e.target.value)}
          error={formError.birthday}
          helperText={formError.birthday ? 'Birthday is required' : ''}
        />

        <TextField
          label="Aggie Ring Day"
          variant="outlined"
          s
          fullWidth
          type="date"
          value={user.aggie_ring_day}
          onChange={(e) => onChange('aggie_ring_day', e.target.value)}
          error={formError.aggie_ring_day}
          helperText={
            formError.aggie_ring_day ? 'Aggie Ring Day is required' : ''
          }
        />

        <TextField
          label="Graduation Day"
          variant="outlined"
          fullWidth
          type="date"
          value={user.graduation_day}
          onChange={(e) => onChange('graduation_day', e.target.value)}
          error={formError.graduation_day}
          helperText={
            formError.graduation_day ? 'Graduation Day is required' : ''
          }
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: '200px' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" sx={{ width: '200px' }}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error">{error.message}</Alert>}
    </form>
  )
}

export default UserForm
