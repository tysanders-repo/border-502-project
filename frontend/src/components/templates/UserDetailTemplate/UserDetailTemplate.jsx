import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchUser, deleteUser } from '../../../services/userService'
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

function UserDetailsTemplate() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

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

  const deleteUserHandler = async () => {
    try {
      await deleteUser(id)
      navigate('/users')
    } catch (error) {
      console.error('Error deleting user:', error)
      setError(error)
    }
  }

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
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            {user.name}'s Profile
          </Typography>
          <Typography variant="h6">UIN: {user.uin}</Typography>
          <Typography variant="h6">Major: {user.major}</Typography>
          <Typography variant="h6">Shirt Size: {user.tshirt_size}</Typography>

          <Box mt={3} sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/users/${id}/edit`}
            >
              Edit Profile
            </Button>
            <Button variant="outlined" color="error" onClick={handleOpenDialog}>
              Delete User
            </Button>
          </Box>

          {/* Confirmation Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete {user.name}'s profile? This
                action cannot be undone.
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
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      ) : (
        <Typography variant="h6">User not found</Typography>
      )}
    </Container>
  )
}

export default UserDetailsTemplate
