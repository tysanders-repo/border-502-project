import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../services/userService'
import UserForm from '../../organisms/UserForm'
import { Container, Typography } from '@mui/material'

function NewMemberFormTemplate() {
  const [user, setUser] = useState({
    name: '',
    uin: '',
    major: '',
    tshirt_size: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState({ name: false, uin: false })

  const userData = {
    name: user.name,
    uin: parseInt(user.uin, 10),
    major: user.major ? user.major : '',
    tshirt_size: user.tshirt_size,
  }
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (validateForm()) {
      try {
        console.log(userData)
        const response = await createUser(userData)
        navigate(`/users/${response.id}`)
      } catch (e) {
        setError('Failed to create user.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }))
  }

  const validateForm = () => {
    const errors = { name: false, uin: false }
    if (user.name.trim() === '') {
      errors.name = true
    }
    if (isNaN(user.uin)) {
      errors.uin = true
    }
    setFormError(errors)
    return !errors.name && !errors.uin
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        New Member Form
      </Typography>
      <UserForm
        user={user}
        loading={loading}
        error={error}
        formError={formError}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default NewMemberFormTemplate
