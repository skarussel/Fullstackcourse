/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
jest.setTimeout(100000)
beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of listWithMultipleBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('correct amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listWithMultipleBlogs.length)

})

test('blogs identifier is named correctly', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()

})

test ('a valid blog entry can be added', async() => {

  const newEntry = {
    title: 'A new Episode of Bojack Horseman',
    author: 'Petra L.',
    url: 'www.newlink.com',
    likes: 133
  }
  await api
    .post('/api/blogs')
    .send(newEntry)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(listWithMultipleBlogs.length + 1)
  expect(titles).toContain(
    'A new Episode of Bojack Horseman'
  )
})

test ('adding entry without likes', async() => {
  const entryWithoutLike = {
    title: 'Can we repeat the weekend',
    author: 'Nadja K',
    url: 'www.weekend.com'
  }

  await api
    .post('/api/blogs')
    .send(entryWithoutLike)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const lastEntry = response.body[response.body.length-1]
  expect(lastEntry.title).toContain(
    entryWithoutLike.title
  )
  expect(lastEntry.likes===0)
})

test ('adding entry without title and url causes response code 400', async() => {
  const entryWithoutURL = {
    title: 'Can we repeat the weekend',
    author: 'Nadja K'
  }

  const entryWithoutTitle = {
    url: 'www.weekend.de',
    author: 'Nadja K'
  }

  await api
    .post('/api/blogs')
    .send(entryWithoutURL)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(entryWithoutTitle)
    .expect(400)

})

test ('deleting an entry will reduce the list length by 1', async() => {

  await api
    .delete(`/api/blogs/${listWithMultipleBlogs[0]._id}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(listWithMultipleBlogs.length-1)
})

test ('update first entry will change it fields', async() => {

  newEntry = {
    'title': 'A updated title',
    'author': 'A new version of myself',
    'url': 'www.abetterwebsite.com',
    'likes': 99
  }

  await api
    .put(`/api/blogs/${listWithMultipleBlogs[0]._id}`)
    .send(newEntry)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toContain(newEntry.title)
  expect(response.body[0].author).toContain(newEntry.author)
})

afterAll(() => {
  mongoose.connection.close()
})
