const NewBlogForm = ({ handleBlogPost, updateState, newBlog, title, author, url }) => {
  return (
    <form onSubmit={handleBlogPost}>
      <div>
        Title
        <input
          type="text"
          name="Title"
          onChange={({ target }) => updateState(target)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => updateState(target)}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => updateState(target)}
        />
      </div>
      {/* <input value={newBlog} onChange={handleChange} />
      <input value={newBlog} onChange={handleChange} /> */}
      <button type="submit">Post</button>
    </form>
  )
}

export default NewBlogForm