import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllUsers, deleteUser } from '../../../services/userService'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

function UserListTemplate() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchAllUsers()
        setUsers(data)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget)
    setSelectedUser(user)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setOpenDialog(true)
    handleCloseMenu()
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const confirmDeleteUser = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.id)
        setUsers(users.filter((user) => user.id !== selectedUser.id))
        setOpenDialog(false)
        setSelectedUser(null)
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: '0 auto',
          gap: '10px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          EWB Members
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>UIN</TableCell>
                <TableCell>Major</TableCell>
                <TableCell>Shirt Size</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link
                      to={`/users/${user.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{user.uin}</TableCell>
                  <TableCell>{user.major}</TableCell>
                  <TableCell>{user.tshirt_size}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => handleMenuClick(event, user)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      slotProps={{
                        paper: {
                          sx: {
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          },
                        },
                      }}
                    >
                      <MenuItem
                        component={Link}
                        to={`/users/${selectedUser?.id}/edit`}
                        onClick={handleCloseMenu}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {selectedUser?.name}? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserListTemplate
