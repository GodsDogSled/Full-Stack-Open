const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('correct amout of blog posts', async () => {
//   const response = await api.get('/api/blogs')
//   assert.strictEqual(response.body.length, 1)
// })

// test("id is named id", async () => {
//   const response = await api.get('/api/blogs')
//   assert.deepStrictEqual(response.body[0], {
//     title: 'Cool Blog',
//     author: 'Gabe',
//     url: 'asdfa',
//     likes: 10,
//     id: '65f38484e876dd9a1e4b18a9'
//   })
// })

// test("create new blog post works", async () => {
//   const newBlog = {
//     title: 'Blog post tester',
//     author: 'Author tester',
//     url: 'www.example.com/tester',
//     likes: 57
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   assert.strictEqual(blogsAtEnd.length, 3)

//   // const contents = blogsAtEnd.map(n => n.content)
//   // assert(contents.includes('async/await simplifies making async calls'))
// })
// test("if likes property missing default to 0", async () => {
//   const newBlog = {
//     title: 'Blog post 0 likes',
//     author: '0 likes',
//     url: 'www.example.com/nolieks',
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()
//   assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)

//   // const contents = blogsAtEnd.map(n => n.content)
//   // assert(contents.includes('async/await simplifies making async calls'))
// })
// test("no title or url results in erro4 400", async () => {
//   const newBlog = {
//     title: 'Blog post 0 likes',
//   }

//   const response = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)

//   console.log(response.status)
//   const blogsAtEnd = await helper.blogsInDb()
//   assert.strictEqual(response.status, 400)


// })

// test("blog post deleted", async () => {
//   const initialBlogs = await helper.blogsInDb()



//   const resp = await api.delete(`/api/blogs/${initialBlogs[0].id}`)

//   const endBlog = await helper.blogsInDb()
//   console.log(resp)

//   assert.strictEqual(initialBlogs.length - 1, endBlog.length)
// })
test("blog post updated", async () => {
  const initialBlogs = await helper.blogsInDb()
  const newInfo = initialBlogs[0]
  const newBlog = {
    title: newInfo.title,
    author: newInfo.author,
    url: newInfo.url,
    likes: newInfo.likes + 300
  }




  await api.put(`/api/blogs/${initialBlogs[0].id}`).send(newBlog)

  const endBlog = await helper.blogsInDb()


  assert.strictEqual(newBlog.likes, endBlog[0].likes)
})






after(async () => {
  await mongoose.connection.close()
})