import React from 'react'
import { TextField, Button, CircularProgress, Alert, Box } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'
import { SideBySideBox } from './UserForm.styles'
import { Majors } from '@utils/arrays/majors'
import { ShirtSizes } from '@utils/arrays/shirts'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const UserForm = ({
  user,
  loading,
  error,
  formError,
  onChange,
  onSubmit,
  handleCancel,
  dietaryRestrictions,
  handleDietaryRestrictionChange,
  selectedDietaryRestrictions,
  personalInterests,
  handlePersonalInterestRestrictionChange,
  selectedPersonalInterests,
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
            value={user.first_name || ''}
            onChange={(e) => onChange('first_name', e.target.value)}
            error={formError.first_name}
            helperText={formError.first_name ? 'First Name is required' : ''}
          />
          <TextField
            required
            label="Last Name"
            variant="outlined"
            fullWidth
            value={user.last_name || ''}
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
            value={user.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            error={formError.phone}
            helperText={formError.phone ? 'Phone Number is required' : ''}
          />
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth
            value={user.email || ''}
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
          value={user.major || ''}
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
            value={user.uin || ''}
            onChange={(e) => onChange('uin', e.target.value)}
            error={formError.uin}
            helperText={formError.uin ? 'Valid UIN is required' : ''}
          />

          <TextField
            required
            label="Graduation Year"
            variant="outlined"
            fullWidth
            value={user.year || ''}
            onChange={(e) => onChange('year', e.target.value)}
            error={formError.year}
            helperText={formError.year ? 'Year is required' : ''}
          />
        </SideBySideBox>

        <Autocomplete
          freeSolo
          options={ShirtSizes}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.value
          }
          value={user.tshirt_size || ''}
          onChange={(e, newValue) =>
            onChange('tshirt_size', newValue?.value || '')
          }
          renderInput={(params) => (
            <TextField required {...params} label="Shirt Size" />
          )}
        />

        <DatePicker
          label="Birthday"
          value={user.birthday ? dayjs(user.birthday) : null}
          onChange={(date) => onChange('birthday', date)}
          error={formError.birthday}
          helperText={formError.birthday ? 'Birthday is required' : ''}
        />

        <DatePicker
          label="Aggie Ring Day"
          value={user.aggie_ring_day ? dayjs(user.aggie_ring_day) : null}
          onChange={(date) => onChange('aggie_ring_day', date)}
          error={formError.aggie_ring_day}
          helperText={
            formError.aggie_ring_day ? 'Aggie Ring Day is required' : ''
          }
        />

        <DatePicker
          label="Graduation Day"
          value={user.graduation_day ? dayjs(user.graduation_day) : null}
          onChange={(date) => onChange('graduation_day', date)}
          error={formError.graduation_day}
          helperText={
            formError.graduation_day ? 'Graduation Day is required' : ''
          }
        />

        <Autocomplete
          freeSolo
          multiple
          value = {selectedDietaryRestrictions}
          options={dietaryRestrictions}
          getOptionLabel={(option) => option.item_name || option} // Allowing for free solo input
          onChange={handleDietaryRestrictionChange}
          renderInput={(params) => (
            <TextField {...params} label="Dietary Restrictions" variant="outlined" />
          )}
        />

        <Autocomplete
          freeSolo
          multiple
          value = {selectedPersonalInterests}
          options={personalInterests}
          getOptionLabel={(option) => option.name || option} // Allowing for free solo input
          onChange={handlePersonalInterestRestrictionChange}
          renderInput={(params) => (
            <TextField {...params} label="Personal Interests" variant="outlined" />
          )}
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
          <Button
            variant="contained"
            type="submit"
            role="button"
            sx={{ width: '200px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error">{error.message}</Alert>}
    </form>
  )
}

export default UserForm
