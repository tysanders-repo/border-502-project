import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../constants'

export function UserEdit() {
  const [user, setUser] = useState([])
  const { id } = useParams()
  const [, setLoading] = useState(true)
  const [, setError] = useState(null)
  const navigate = useNavigate()

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
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          uin: user.uin
        }),
      })
      if (response.ok) {
        const json = await response.json()
        console.log('Success: ', json)
      } else {
        throw response
      }
    } catch (e) {
      console.log('An error occured: ', e)
    }
  }

  if (!user) return <h2>loading</h2>

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user-name">Name</label>
          <br />
          <input
            type="text"
            id="user-name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="user-name">UIN</label>
          <br />
          <input
            type="text"
            id="user-uin"
            value={user.uin}
            onChange={(e) => setUser({ ...user, uin: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
