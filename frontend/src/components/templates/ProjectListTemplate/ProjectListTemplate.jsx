import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProjects } from '../../../services/projectService'
import DeleteProjectDialog from '../../organisms/DeleteProjectDialog'
import { useNavigate } from 'react-router-dom'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

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
import { useTheme } from '@mui/material/styles'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function ProjectListTemplate() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selecteProject, setSelectedProject] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navigate = useNavigate()

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'date', headerName: 'Start Date', flex: 1 },
    {
      field: 'actions',
      sortable: false,
      hideable: false,
      headerName: '',
      renderCell: (params) => (
        <div>
          <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              component={Link}
              to={`/projects/${selecteProject?.id}`}
              onClick={handleCloseMenu}
            >
              View
            </MenuItem>
            <MenuItem
              component={Link}
              to={`/projects/${selecteProject?.id}/edit`}
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
    async function loadProjects() {
      try {
        const data = await fetchAllProjects()
        setProjects(data)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget)
    setSelectedProject(user)
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
          }}
        >
          <Typography variant="h4">Projects</Typography>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/projects')}
              startIcon={<ManageAccountsIcon />}
            >
              {isMobile ? 'Members' : 'Manage Members'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate('/new-project')}
            >
              {isMobile ? 'Proejct' : 'Add Project'}
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
        />
      </Box>

      <DeleteProjectDialog
        project={selecteProject}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        id={selecteProject?.id}
        setError={setError}
      />
    </>
  )
}

export default ProjectListTemplate
