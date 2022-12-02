/* eslint-disable no-undef */
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
require('express-async-errors')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('author', {
      username: 1,
      name: 1,
      id: 1
    })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: user._id
  })
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (user.id.toString() === blog.author.toString()){
    blog.delete()
    response.status(204).end()
  }
  else {
    response.status(401).json({ error: 'token invalid or missing. You can only delete your own posts.' })
  }

})

blogRouter.put('/:id', async (request, response) => {

  const body = request.body

  const newEntry = {
    title: body.title,
    author: body.author.id,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, newEntry)
  response.json(result)
})
module.exports = blogRouter
