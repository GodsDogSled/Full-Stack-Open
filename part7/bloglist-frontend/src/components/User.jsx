import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const User = ({ userData }) => {
  const user = useParams()
  const thisUser = userData.find(obj => obj.id === user.id)

  return (
    <>
      {thisUser ?
        <div>
          <h2>{thisUser.username}</h2>
          <h3>added blogs</h3>
          <ul>
            {thisUser.blogs.map(blog => {
              return (
                <li>
                  <Link to={`post/${blog.id}`}>{blog.title}</Link>
                </li>
              )
            })}
          </ul>
          {thisUser.blogs.length === 0 ? <p>this user had 0 posts</p> : null}
        </div>

        :
        <p>user data loading</p>
      }
    </>
  )
}


export default User
