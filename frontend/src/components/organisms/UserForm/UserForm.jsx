import React from 'react'
import { TextField, Button, CircularProgress, Alert, Box } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'

import { Majors } from '../../../utils/arrays/majors'
import { ShirtSizes } from '../../../utils/arrays/shirts'

const UserForm = ({ user, loading, error, formError, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={user.name}
          onChange={(e) => onChange('name', e.target.value)}
          error={formError.name}
          helperText={formError.name ? 'Name is required' : ''}
        />

        <TextField
          label="UIN"
          variant="outlined"
          fullWidth
          type="number"
          value={user.uin}
          onChange={(e) => onChange('uin', e.target.value)}
          error={formError.uin}
          helperText={formError.uin ? 'Valid UIN is required' : ''}
        />

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

        <TextField
          id="outlined-select-currency"
          select
          required
          label="Shirt Size"
          value={user.tshirt_size}
          onChange={(e) => onChange('tshirt_size', e.target.value)}
          placeholder="Select a size"
          sx={{ width: '100%', textAlign:'left' }}
        >
          {ShirtSizes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
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
