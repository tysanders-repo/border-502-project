import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../constants'

export function UserDetails() {
  const [user, setUser] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${id}`)
        if (response.ok) {
          const json = await response.json()
          setUser(json)
        } else {
          throw response
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    fetchCurrentUser()
  }, [id])

  if (!user) return <h2>Loading...</h2>

  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.id}</p>
    </>
  )
}
