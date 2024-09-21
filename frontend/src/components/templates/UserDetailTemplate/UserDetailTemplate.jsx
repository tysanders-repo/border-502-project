import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchUser } from '../../../services/userService'
import DeleteConfirmationDialog from '../../organisms/DeleteConfirmationDialog'
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material'

function UserDetailsTemplate() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    uin: null,
    major: '',
    year: null,
    email: '',
    phone: '',
    tshirt_size: '',
    aggie_ring_day: '',
    birthday: null,
    graduation_day: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const json = await fetchUser(id)
        setUser(json)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [id])

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  if (loading) return <CircularProgress />

  if (error)
    return <Alert severity="error">Error fetching user: {error.message}</Alert>

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      {user ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}'s Information
          </Typography>
          <Typography variant="h6">UIN: {user.uin}</Typography>
          <Typography variant="h6">Major: {user.major}</Typography>
          <Typography variant="h6">Year: {user.year}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
          <Typography variant="h6">Phone: {user.phone}</Typography>
          <Typography variant="h6">Shirt Size: {user.tshirt_size}</Typography>
          <Typography variant="h6">
            Aggie Ring Day: {user.aggie_ring_day || 'N/A'}
          </Typography>
          <Typography variant="h6">
            Birthday: {user.birthday || 'N/A'}
          </Typography>
          <Typography variant="h6">
            Graduation Day: {user.graduation_day || 'N/A'}
          </Typography>

          <Box
            mt={3}
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
          >
            <Button variant="outlined" color="error" onClick={handleOpenDialog}>
              Delete Account
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/users/${id}/edit`}
            >
              Edit Profile
            </Button>
          </Box>

          <DeleteConfirmationDialog
            user={user}
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            id={id}
            setError={setError}
          />

          {/* Confirmation Dialog
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete Account</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete {user.first_name}{' '}
                {user.last_name}'s profile? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteUserHandler()
                  handleCloseDialog()
                }}
                color="error"
                autoFocus
              >
                Delete Account
              </Button>
            </DialogActions>
          </Dialog> */}
        </Box>
      ) : (
        <Typography variant="h6">User not found</Typography>
      )}
    </Container>
  )
}

export default UserDetailsTemplate
