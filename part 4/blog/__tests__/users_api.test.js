/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const initialUsers = [
  {
    _id: '5a422a851b54a676234d17f7',
    name: 'Michael Chan',
    username: 'michael37',
    password: 'password123',
    __v: 0
  },
  {
    _id: '9a422a851b68a676234d17f7',
    name: 'Peter Pan',
    username: 'peter948',
    password: 'pw2313',
    __v: 0
  }
]
saltRounds = 10
jest.setTimeout(100000)
beforeEach(async () => {
  await User.deleteMany({})
  for (const user of initialUsers){
    let userObject = new User(user)
    userObject.passwordHash = await bcrypt.hash(user.password, saltRounds)
    await userObject.save()
  }
})

test ('users get returned as json', async () => {

  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})

test ('correct amount of users get returned', async () => {

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(initialUsers.length)

})

test ('invalid users raise correct error code', async () => {

  const userWithInvalidUsername = {
    _id: '1b422a851b54a676234d17f7',
    username: 'Pe',
    name: 'Peter Pan',
    password: 'petra1234'
  }

  const userWithoutUsername = {
    _id: '2b422a851b54a676234d17f7',
    name: 'Peter Pan',
    password: 'petra1234'
  }

  const userWithInvalidPassword = {
    _id: '3b422a851b54a676234d17f7',
    username: 'Peter',
    name: 'Peter Pan',
    password: 'pe'
  }

  const userWithoutPassword = {
    _id: '4b422a851b54a676234d17f7',
    username: 'Pe',
    name: 'Peter Pan'
  }

  api
    .post('/api/users')
    .send(userWithInvalidUsername)
    .expect(400)

  api
    .post('/api/users')
    .send(userWithoutUsername)
    .expect(400)

  api
    .post('/api/users')
    .send(userWithInvalidPassword)
    .expect(400)

  api
    .post('/api/users')
    .send(userWithoutPassword)
    .expect(400)


})