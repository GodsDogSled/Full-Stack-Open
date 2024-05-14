import { useState, useEffect } from "react"
import Togglable from "./Togglable"
import { useParams } from "react-router-dom"
import CommentForm from "./CommentForm"
import Comments from "./Comments"

const Blog = ({ deleteBlog, likeBlog, loggedUser, blogs }) => {
  const post = useParams()
  console.log('use params id:', post.id)
  console.log("allblogs", blogs)
  const blog = blogs.find(obj => obj.id === post.id)
  const [likes, setLikes] = useState()
  // useEffect(() => {
  //   setLikes(blog.likes)
  // }, [])

  const handleLike = (likeIncramnet) => {
    setLikes(likeIncramnet)
    likeBlog(blog, likeIncramnet)
  }

  if (!blog) {
    console.log("this blog:", blog)
    return null
  }

  return (
    <>
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
      <Comments />
      <CommentForm />

    </>

  )


}

export default Blog