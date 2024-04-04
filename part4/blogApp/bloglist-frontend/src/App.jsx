import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogPostMessage, setBlogPostMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateFormState = (field) => {
    switch (field.name) {
      case "Username":
        setUsername(field.value)
        break;
      case "Password":
        setPassword(field.value)
        break;
      case "Title":
        setTitle(field.value)
        console.log(title)
        break;
      case "Author":
        setAuthor(field.value)
        break;
      case "Url":
        setUrl(field.value)
        break;
      default:
        null
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogPost = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setBlogPostMessage(`${title} by ${author} added`)
    } catch (exception) {
      setErrorMessage('Blog Post Error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {

    try {

      const newBlog = await blogService.remove(blog.id)

      setBlogPostMessage(`${blog.title} by ${blog.author} DELETED`)
    } catch (exception) {
      setErrorMessage('Blog Delete Error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setBlogs(blogs.filter(newBlog => newBlog.id !== blog.id))
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return (
    <div>
      <h1>Personal Blogs</h1>
      {errorMessage ? <p className='error'>{errorMessage}</p> : ""}
      {blogPostMessage ? <p className='success-message'>{blogPostMessage}</p> : ""}
      {user === null
        ?
        <Togglable buttonLabel={'Login'}>
          <LoginForm username={username} password={password} handleLogin={handleLogin} updateState={updateFormState} handleBlogPost={handleBlogPost} />
        </Togglable>
        :
        <div className="logged-in">
          <Togglable buttonLabel={'New Blog Post'} ref={blogFormRef}>
            <NewBlogForm
              updateState={updateFormState}
              handleBlogPost={handleBlogPost}
            />
          </Togglable>
          <h3>{user.username} logged in</h3><br></br>
          <button onClick={() => logout()}>Log Out</button>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App