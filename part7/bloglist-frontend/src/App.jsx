import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import { successNotification, errorNotification, resetNotification } from './reducers/notificationReducer'
import { initializeBlogPosts, likePost } from './reducers/blogPostReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlogPost, deletePost } from './reducers/blogPostReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const notifications = useSelector(state => state.notification);
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    // blogService.getAll().then(blogs => {
    //   setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    // })
    dispatch(initializeBlogPosts())
  }, [])

  useEffect(() => {
    if (notifications.error || notifications.success) {
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }
  }, [notifications.error, notifications.success])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(errorNotification("Wrong Credentials"))
    }
  }

  const handleBlogPost = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    try {
      // const newBlog = await blogService.create(blogObject)
      dispatch(createBlogPost(blogObject))
      dispatch(successNotification(`${blogObject.title} by ${blogObject.author} added`))
    } catch (exception) {
      dispatch(errorNotification("Blog Post Error"))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      console.log(blog.id)
      console.log(deletePost)
      dispatch(deletePost(blog.id))
      dispatch(successNotification(`${blog.title} by ${blog.author} DELETED`))
    } catch (exception) {
      dispatch(errorNotification("BlogPost Error"))
    }
  }

  const handleLike = async (blog, likes) => {
    const likedBlog = { ...blog, likes: likes }
    await blogService.update(blog.id, likedBlog)
    // const sortedOrder = blogs.sort((a, b) => b.likes - a.likes)
    // const updatedBlogs = [...blogs.filter(curBlog => curBlog.id !== blog.id), likedBlog]
  }

  const logout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return (
    <div>
      <h1>Personal Blogs</h1>
      {notifications.error ? <p className='error'>{notifications.error}</p> : ""}
      {notifications.success ? <p className='success-message'>{notifications.success}</p> : ""}
      {user === null
        ?
        <Togglable buttonLabel={'Login'}>
          <LoginForm username={username} password={password} handleLogin={handleLogin} updateState={updateFormState} handleBlogPost={handleBlogPost} />
        </Togglable>
        :
        <div className="logged-in">
          <h3>{user.username} logged in</h3>

          <button onClick={() => logout()}>Log Out</button>
          <button onClick={() => console.log(user)}>View ID</button>
          <Togglable buttonLabel={'New Blog Post'} ref={blogFormRef}>
            <NewBlogForm
              createBlogPost={handleBlogPost}
            />
          </Togglable>

          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} likeBlog={handleLike} loggedUser={user.id} />
          )}
        </div>
      }
    </div>
  )
}

export default App