import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { deleteUser } from 'services/userService'

const DeleteConfirmationDialog = ({
  user,
  openDialog,
  handleCloseDialog,
  id,
  setError,
}) => {
  const navigate = useNavigate()

  const deleteUserHandler = async () => {
    try {
      await deleteUser(id)
      navigate('/users')
    } catch (error) {
      console.error('Error deleting user:', error)
      setError(error)
    }
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {user?.first_name} {user?.last_name}'s
          profile? This action cannot be undone.
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
    </Dialog>
  )
}

export default DeleteConfirmationDialog
