import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { fetchProject, updateProject } from 'services/projectService'
import ProjectForm from 'components/organisms/ProjectForm/ProjectForm'

function ProjectEditTemplate() {
  const [project, setProject] = useState({
    title: '',
    description: '',
    date: null,
    pictures: null,
    timeline: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState({ name: false, uin: false })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentProject = async () => {
      try {
        const json = await fetchProject(id)
        setProject(json)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentProject()
  }, [id])

  const handleCancel = async (e) => {
    navigate(`/projects`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await updateProject(id, project)
        console.log(response)
        navigate(`/projects/${response.id}`)
      } catch (e) {
        setError(e)
      }
    }
  }

  const handleChange = (field, value) => {
    setProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }))
  }

  const validateForm = () => {
    return true
    // const errors = { name: false, uin: false }
    // if (user.name.trim() === '') {
    //   errors.name = true
    // }
    // if (isNaN(user.uin)) {
    //   errors.uin = true
    // }
    // setFormError(errors)
    // return !errors.name && !errors.uin
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Project - {project.title}
      </Typography>
      <ProjectForm
        project={project}
        loading={loading}
        error={error}
        formError={formError}
        onChange={handleChange}
        onSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Container>
  )
}

export default ProjectEditTemplate
