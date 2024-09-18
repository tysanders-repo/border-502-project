import { useState } from 'react'
import UserInfoTemplate from '../components/templates/UserInfoTemplate'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../constants'

export function NewUserInfo() {
  const [name, setName] = useState('')
  const [uin, setUin] = useState(null)
  const navigate = useNavigate()

  const userData = { name, uin }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    if (response.ok) {
      const { id } = await response.json()
      navigate(`/users/${id}`)
    }
    else{
      console.log("An error occured")
    }
  }
  return (
    <>
      {/* <UserInfoTemplate /> */}
      <div>New User Form</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Name</label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nameInput">UIN</label>
          <input
            id="uinInput"
            type="number"
            value={uin}
            onChange={(e) => setUin(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Create User</button>
        </div>
      </form>
    </>
  )
}
