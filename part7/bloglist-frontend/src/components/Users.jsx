import React from 'react'
import { useEffect } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersListReducer'
import { Link } from 'react-router-dom'



export default function Users(users) {

  const Rows = users.data.map(user => {
    return (
      <tr key={user.id}>
        <td> <Link to={`/users/${user.id}`}>{user.username}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })
  console.log(users.data)

  return (
    <>
      {users.data.length > 0 ?
        <table>
          <thead><tr><th></th><th>blogs created</th></tr></thead>
          <tbody>{Rows}</tbody>
        </table>
        :
        <p>users loading...</p>
      }
    </>
  )
}
