import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../services/userService'
import UserForm from '../../organisms/UserForm'
import { Container, Typography } from '@mui/material'

function NewMemberFormTemplate() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    uin: null,
    major: '',
    year: null,
    email: '',
    phone: '',
    tshirt_size: '',
    aggie_ring_day: '',
    birthday: null,
    graduation_day: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState({ name: false, uin: false })

  const userData = {
    first_name: user.first_name,
    last_name: user.last_name,
    uin: user.uin,
    major: user.major,
    year: user.year,
    email: user.email,
    phone: user.phone,
    tshirt_size: user.tshirt_size,
    aggie_ring_day: user.aggie_ring_day,
    birthday: user.birthday,
    graduation_day: user.graduation_day,
  }
  const navigate = useNavigate()

  const handleCancel = async (e) => {
    navigate(`/`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (validateForm()) {
      try {
        console.log(userData)
        const response = await createUser(userData)
        navigate(`/users/${response.uin}`)
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
    return true
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
        handleCancel={handleCancel}
      />
    </Container>
  )
}

export default NewMemberFormTemplate
