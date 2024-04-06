import { useState } from "react"

const NewBlogForm = ({ createBlogPost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleBlogPost = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    createBlogPost(blog)
  }

  return (
    <form onSubmit={handleBlogPost}>
      <div>
        Title
        <input
          type="text"
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Title here...'
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Author here...'
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url here...'
        />
      </div>
      {/* <input value={newBlog} onChange={handleChange} />
      <input value={newBlog} onChange={handleChange} /> */}
      <button type="submit">Post</button>
    </form>
  )
}

export default NewBlogForm