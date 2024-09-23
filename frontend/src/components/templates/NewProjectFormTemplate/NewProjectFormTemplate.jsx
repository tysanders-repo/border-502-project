import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../../../services/projectService'
import { Container, Typography } from '@mui/material'
import ProjectForm from '../../organisms/ProjectForm/ProjectForm'

function NewProjectFormTemplate() {
  const [project, setProject] = useState({
    title: '',
    description: '',
    date: null,
    pictures: null,
    timeline: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState({ name: false, uin: false })

  const navigate = useNavigate()

  const handleCancel = async (e) => {
    navigate(`/projects`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (validateForm()) {
      try {
        const response = await createProject(project)
        navigate(`/projects/${response.id}`)
      } catch (e) {
        setError('Failed to create project.')
      } finally {
        setLoading(false)
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
    // if (project.title.trim() === '') {
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
        Add New Project
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

export default NewProjectFormTemplate
