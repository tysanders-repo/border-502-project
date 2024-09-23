import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserForm from 'components/organisms/UserForm'
import { Container, Typography } from '@mui/material'
import { fetchUser, updateUser } from 'services/userService'

function UserEditTemplate() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    uin: null,
    major: '',
    year: null,
    email: '',
    phone: '',
    tshirt_size: '',
    aggie_ring_day: null,
    birthday: null,
    graduation_day: null,
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

  const handleCancel = async (e) => {
    navigate(`/users`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      const updatedUser = {
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
      try {
        const response = await updateUser(id, updatedUser)
        console.log(response)
        navigate(`/users/${response.uin}`)
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
        Edit User - {user.first_name} {user.last_name}
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

export default UserEditTemplate
