const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog post 1',
    author: 'Author 1',
    url: 'www.example.com/1',
    likes: 8
  },
  {
    title: 'Blog post 2',
    author: 'Author 2',
    url: 'www.example.com/2',
    likes: 16
  },
]



const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}