const Blog = ({ blog, deleteBlog }) => (
  <div style={{ border: "1px solid black", margin: "1em", width: "20%" }}>
    <span style={{ fontWeight: "bold" }} >{blog.title}</span>
    <p>-{blog.author}</p>
    <p>Likes: {blog.likes}</p>
    <button onClick={() => deleteBlog(blog)}>delete</button>
  </div>
)

export default Blog