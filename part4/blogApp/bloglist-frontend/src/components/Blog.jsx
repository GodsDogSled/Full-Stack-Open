const Blog = ({ blog }) => (
  <div style={{ border: "1px solid black", margin: "1em", width: "20%" }}>
    <span style={{ fontWeight: "bold" }} >{blog.title}</span>
    <p>-{blog.author}</p>
  </div>
)

export default Blog