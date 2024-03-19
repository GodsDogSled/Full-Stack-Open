const blogRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')



// blogRouter.get('/', (request, response) => {
//   console.log(response)
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.url || !blog.author) {
    console.log(blog.title)
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }


})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.title,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})
// blogRouter.post('/', async (request, response) => {
//   const body = request.body

//   const blog = new Blog({
//     title: body.title
//   })
// })

module.exports = blogRouter