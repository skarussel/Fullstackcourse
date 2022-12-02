import { useState } from 'react'


const BlogForm = ({
  addBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObject = {
      'title': title,
      'author': author,
      'url': url
    }
    addBlog(newObject)
    setTitle('')
    setAuthor('')
    setUrl('')

  }



  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id ="title"
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
          <div>
          author
            <input
              id ="author"
              type="text"
              value={author}
              name="author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
          url
            <input
              id ="url"
              type="text"
              value={url}
              name="url"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit" id="addBlog">Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm