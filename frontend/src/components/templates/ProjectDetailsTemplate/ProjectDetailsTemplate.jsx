import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProject } from 'services/projectService'
import DeleteProjectDialog from 'components/organisms/DeleteProjectDialog'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { format } from 'date-fns'

import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  IconButton,
} from '@mui/material'

function ProjectDetailsTemplate() {
  const [project, setProject] = useState({
    title: '',
    description: '',
    date: null,
    pictures: null,
    timeline: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchCurrentProject = async () => {
      try {
        const json = await fetchProject(id)
        setProject(json)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch project:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchCurrentProject()
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
      {project ? (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <IconButton onClick={() => navigate('/projects')}>
            <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h4" gutterBottom>
              {project.title}
            </Typography>
            <Typography variant="h6">
              Start Date: {format(new Date(project.date), 'MMMM d, yyyy')}
            </Typography>
            <Typography variant="h6">
              Description: {project.description}
            </Typography>

            <Box
              mt={3}
              sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleOpenDialog}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/projects/${id}/edit`}
              >
                Edit Project
              </Button>
            </Box>

            <DeleteProjectDialog
              project={project}
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              id={id}
              setError={setError}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="h6">Project not found</Typography>
      )}
    </Container>
  )
}

export default ProjectDetailsTemplate
