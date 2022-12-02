import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable  from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs)
      blogs.sort((a, b) => b.likes - a.likes)

    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const like = async (blogObject) => {
    await blogService.like(blogObject)
    const newState = blogs.map(obj => {
      if (obj.id === blogObject.id) {
        return blogObject
      }
      return obj
    })

    setBlogs(newState)
  }



  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
      notify('Login Succesful')
    }
    catch (exception) {
      notify('Wrong Credentials. Login Failed', 'alert')
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')

  }

  const addBlog = async (BlogObject) => {

    try {
      const returnObject = await blogService.create(BlogObject)
      setBlogs(blogs.concat(returnObject))
      notify(`Entry ${returnObject.title} created succesful`)
    }
    catch (exception) {
      notify(exception.response.data.error, 'alert')
    }

  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification notification={notification}/>
        <LoginForm
          username = {username}
          password = {password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <p>{user.name} is logged in <button onClick={handleLogout} id="logoutButton">Logout</button></p>
      <Togglable buttonLabel="new Blog" id="newBlogButton">
        <BlogForm
          addBlog={addBlog}
        />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} like={like}/>
      )}

    </div>
  )
}

export default App
