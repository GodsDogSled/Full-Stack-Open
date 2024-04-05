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

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })
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

  const handleBlogPost = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setBlogPostMessage(`${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setBlogPostMessage(null)
      }, 7000)
    } catch (exception) {
      console.log(exception)
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
      setTimeout(() => {
        setBlogPostMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog Delete Error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setBlogs(blogs.filter(newBlog => newBlog.id !== blog.id))
  }

  const handleLike = async (blog, likes) => {
    console.log(blog)
    const likedBlog = { ...blog, likes: likes }
    console.log(likedBlog)
    const updated = await blogService.update(blog.id, likedBlog)
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
          <h3>{user.username} logged in</h3>
          <button onClick={() => logout()}>Log Out</button>
          <Togglable buttonLabel={'New Blog Post'} ref={blogFormRef}>
            <NewBlogForm
              createBlogPost={handleBlogPost}
            />
          </Togglable>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} likeBlog={handleLike} />
          )}
        </div>
      }
    </div>
  )
}

export default App