import { useState, useEffect } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, deleteBlog, likeBlog, loggedUser }) => {
  const [likes, setLikes] = useState()
  useEffect(() => {
    setLikes(blog.likes)

  }, [])

  const handleLike = (likeIncramnet) => {
    setLikes(likeIncramnet)
    likeBlog(blog, likeIncramnet)
  }

  return (
    <div style={{ border: "1px solid black", margin: "1em", width: "20%" }}>
      <span className="blog-title" style={{ fontWeight: "bold" }} >{blog.title}</span>
      <p className="blog-author">-{blog.author}</p>
      <Togglable buttonLabel={"View Details"} closeLabel={"Close"}>
        <div style={{ display: "flex", marginBottom: "1em" }}>
          <p data-testid='likes' style={{ margin: "0" }}>Likes: {likes}</p><button onClick={() => handleLike(likes + 1)}>Like</button>
        </div>
        <div>
          <p>Posted by: {blog.user.username}</p>
        </div>
        {((blog.user.id === loggedUser) || !blog.user.id) ? <button onClick={() => deleteBlog(blog)}>delete</button> : ""}
      </Togglable>
    </div>
  )
}

export default Blog