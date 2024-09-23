import React, { useState, useEffect } from 'react'
import {
  CircularProgress,
  Alert,
  Typography,
  Container,
  Box,
} from '@mui/material'
import { fetchAllProjects } from 'services/projectService'
import { format } from 'date-fns'

const HomepageTemplate = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchAllProjects()
        setProjects(data)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  if (loading) {
    return <CircularProgress role="progressbar" />
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }
  return (
    <Container maxWidth="md">
      <Typography variant="h1" gutterBottom>
        Engineering Without Borders
      </Typography>
      <Typography variant="h5" gutterBottom>
        Who We Are
      </Typography>
      <Typography variant="body1">
        Engineers Without Borders-USA (EWB-USA) is a non-profit organization
        that partners with developing communities worldwide in an effort to
        improve their quality of life through sustainable engineering projects.
        By placing an emphasis on sustainability, EWB-USA ensures that its
        projects can be facilitated and maintained by the community well after
        the project is implemented. For more information about EWB-USA, visit:
        <a href="http://ewb-usa.org" target="_blank" rel="noopener noreferrer">
          {' '}
          http://ewb-usa.org
        </a>
        .
      </Typography>
      <br />
      <Typography variant="body1">
        The Engineers Without Borders-USA Texas A&M University Student Chapter
        (EWB-TAMU) is a community of 100+ active students, engineering faculty
        and professional mentors. Of 350 student chapters in the United States,
        EWB-TAMU is among the leaders in number of projects and membership. Our
        members rank among the top engineering students at Texas A&M University
        and have a passion for service. EWB-TAMU members maintain a rigorous
        class schedule while attending weekly officer and project meetings,
        monthly chapter meetings, and various training sessions throughout the
        year. Our mission is to deliver sustainable and innovative solutions to
        real-world problems in order to empower international communities by
        offering opportunities for the students of Texas A&M University to:
      </Typography>
      <br />
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      {projects &&
        projects.map((project) => (
          <Box key={project.id}>
            <Typography variant="h5">
              {project.title} - {format(new Date(project.date), 'MMMM d, yyyy')}
            </Typography>
            <Typography variant="body1">{project.description}</Typography>
            <br />
          </Box>
        ))}
    </Container>
  )
}

export default HomepageTemplate
