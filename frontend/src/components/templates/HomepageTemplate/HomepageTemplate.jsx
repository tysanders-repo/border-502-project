import React, { useEffect, useState } from 'react'
import axios from 'axios'

function getAPIData() {
  return axios
    .get('http://localhost:3001/api/users')
    .then((response) => response.data)
}

const HomepageTemplate = (props) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    getAPIData()
      .then((items) => {
        if (isMounted) {
          setUsers(items)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'An error occurred')
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>All Users</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h3>{user.uin}</h3>
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  )
}

export default HomepageTemplate
