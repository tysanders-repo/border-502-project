import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllUsers, updateUserPresident } from '../../../services/userService'
import DeleteConfirmationDialog from '../../organisms/DeleteConfirmationDialog'
import {
  CircularProgress,
  Alert,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useMediaQuery } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

function UserListTemplate() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [filter, setFilter] = useState('active') // Default filter to show active members
  const isMobile = useMediaQuery('(max-width:800px)') // Adjust the breakpoint as needed

  const capitalizeAndReplace = (str) => {
    if (!str) return 'hello'
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    uin: false,
    tshirt_size: false,
    join_date: false,
    aggie_ring_day: false,
    birthday: false,
    graduation_day: false,
    accepted: false,
    year: false,
  })

  useEffect(() => {
    if (isMobile) {
      setColumnVisibilityModel({
        uin: false,
        first_name: true,
        last_name: true,
        role: false,
        major: false,
        year: false,
        email: true,
        phone: false,
        tshirt_size: false,
        paid_dues: false,
        join_date: false,
        aggie_ring_day: false,
        birthday: false,
        graduation_day: false,
        accepted: false,
      })
    } else {
      setColumnVisibilityModel({
        uin: false,
        first_name: true,
        last_name: true,
        role: true,
        major: true,
        year: true,
        email: true,
        phone: true,
        tshirt_size: false,
        paid_dues: true,
        join_date: false,
        aggie_ring_day: false,
        birthday: false,
        graduation_day: false,
        accepted: false,
      })
    }
  }, [isMobile])

  const columns = [
    { field: 'uin', headerName: 'UIN', flex: 1 },
    { field: 'first_name', headerName: 'First Name', flex: 1 },
    { field: 'last_name', headerName: 'Last Name', flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      valueGetter: (params) => capitalizeAndReplace(params),
    },
    { field: 'major', headerName: 'Major', flex: 2 },
    { field: 'year', headerName: 'Year', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'phone', headerName: 'Phone Number', flex: 1.5 },
    { field: 'tshirt_size', headerName: 'Shirt Size', flex: 1, hide: false },
    {
      field: 'paid_dues',
      headerName: 'Dues Paid',
      flex: 1,
      valueGetter: (params) => (params.value ? 'Yes' : 'No'),
    },
    { field: 'join_date', headerName: 'Join Date', flex: 1 },
    { field: 'aggie_ring_day', headerName: 'Ring Date', flex: 1 },
    { field: 'birthday', headerName: 'Birthday', flex: 1 },
    {
      field: 'graduation_day',
      headerName: 'Graduation Date',
      flex: 1,
    },
    {
      field: 'accepted',
      headerName: 'Accepted?',
      flex: 1,
      valueGetter: (params) => (params ? 'Yes' : 'No'),
    },
    {
      field: 'actions',
      sortable: false,
      hideable: false,
      headerName: '',
      renderCell: (params) => (
        <div>
          {filter === 'new_applications' ? (
            <div>
              <IconButton onClick={() => handleAccept(params.row.uin)}>
                <CheckIcon color="success" />
              </IconButton>
              <IconButton onClick={() => handleArchive(params.row.uin)}>
                <CloseIcon color="error" />
              </IconButton>
            </div>
          ) : (
            <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
              <MoreVertIcon />
            </IconButton>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              component={Link}
              to={`/users/${selectedUser?.uin}/edit`}
              onClick={handleCloseMenu}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
        </div>
      ),
    },
  ]

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

  const handleCloseDialog = () => {
    setOpenDialog(false)
    window.location.reload()
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleDeleteClick = () => {
    setOpenDialog(true)
    handleCloseMenu()
  }

  //WIll have to change when authentication and roles are implemented !!!!

  const handleAccept = async (uin) => {
    try {
      await updateUserPresident(uin, { accepted: true }) 
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uin === uin ? { ...user, accepted: true } : user
        )
      )
    } catch (err) {
      setError(err)
    }
  }

  const handleArchive = async (uin) => {
    try {
      await updateUserPresident(uin, { archived: true }) 
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uin === uin ? { ...user, archived: true } : user
        )
      )
    } catch (err) {
      setError(err)
    }
  }
  
  // Filter users based on the selected filter
  const filteredUsers = users.filter((user) => {
    if (filter === 'archived') return user.archived === true
    if (filter === 'new_applications') return !user.accepted && !user.archived
    if (filter === 'active') return user.accepted && !user.archived
    return true // Default case
  })

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

        {/* Filter buttons */}
        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Button
              variant={filter === 'active' ? 'contained' : 'outlined'}
              onClick={() => setFilter('active')}
            >
            Show Active Members
          </Button>
          <Button
            variant={filter === 'new_applications' ? 'contained' : 'outlined'}
            onClick={() => setFilter('new_applications')}
          >
            Show New Applications
          </Button>
          <Button
            variant={filter === 'archived' ? 'contained' : 'outlined'}
            onClick={() => setFilter('archived')}
          >
            Show Archived Members
          </Button>
        </Box>

        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.uin}
          disableRowSelectionOnClick
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={setColumnVisibilityModel}
        />
      </Box>

      <DeleteConfirmationDialog
        user={selectedUser}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        id={selectedUser?.uin}
        setError={setError}
      />
    </>
  )
}

export default UserListTemplate
