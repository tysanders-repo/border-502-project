import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../constants'

export function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${API_URL}/users`)
        if (response.ok) {
          const json = await response.json()
          setUsers(json)
        } else {
          throw new Error('Network response was not ok.')
        }
      } catch (e) {
        setError('An error occurred. Awkward...')
        console.log('An error occurred:', e)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <h2>EWB Members</h2>
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link> - {user.uin}
          </li>
        ))}
      </ol>
    </>
  )
}
