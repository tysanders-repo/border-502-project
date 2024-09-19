import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserForm from '../../organisms/UserForm'
import { Container, Typography } from '@mui/material'
import { fetchUser, updateUser } from '../../../services/userService'

function UserEditTemplate() {
  const [user, setUser] = useState({
    name: '',
    uin: '',
    major: '',
    tshirt_size: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState({ name: false, uin: false })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const json = await fetchUser(id)
        setUser(json)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      const updatedUser = {
        name: user.name,
        uin: user.uin,
        major: user.major,
        tshirt_size: user.tshirt_size,
      }
      try {
        const response = await updateUser(id, updatedUser)
        navigate(`/users/${response.id}`)
      } catch (e) {
        setError(e)
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
        Edit User - {user.name}
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

export default UserEditTemplate
