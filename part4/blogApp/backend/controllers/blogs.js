const blogRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    console.log(authorization.replace('Bearer ', ''))
    return authorization.replace('Bearer ', '')
  }
  console.log(authorization)
  return null
}

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  console.log(decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    ...request.body,
    user: user.id
  })

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  if (!newBlog.url || !newBlog.author) {
    console.log(newBlog.title)
    response.status(400).end()
  } else {

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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
    likes: body.likes,
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