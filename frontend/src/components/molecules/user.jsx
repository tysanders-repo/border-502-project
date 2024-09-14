import React from 'react'

function User(props) {
  return (
    <div>
      {props.users.map((user) => {
        return (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h3>{user.uin}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default User
