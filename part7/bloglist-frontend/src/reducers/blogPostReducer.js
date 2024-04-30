import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlogPost(state, action) {
      console.log(state)
      state.push(action.payload)

    },
    likePost(state, action) {
      console.log(action.payload)

    },
    removePost(state, action) {
      return current(state).filter(blog => blog.id !== action.payload)
    },
    setBlogPosts(state, action) {
      return action.payload
    }
  }
})

export const { setBlogPosts, removePost, likePost, appendBlogPost } = blogSlice.actions

export const initializeBlogPosts = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogPosts(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlogPost = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlogPost(newBlog))
  }
}

export const deletePost = (id) => {
  console.log(id)
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removePost(id))
  }
}

export default blogSlice.reducer