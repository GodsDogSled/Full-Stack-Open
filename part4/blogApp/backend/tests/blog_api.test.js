const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
// const helper = require('./test_helper')
const Blog = require('../models/blog')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const api = supertest(app)


// beforeEach(async () => {
//   await Blog.deleteMany({})
//   console.log('cleared')

//   helper.initialNotes.forEach(async (note) => {
//     let noteObject = new Note(note)
//     await noteObject.save()
//     console.log('saved')
//   })
//   console.log('done')
// })

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amout of blog posts', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 1)
})






after(async () => {
  await mongoose.connection.close()
})