import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, like }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleLike = async () => {
    const blogCopy = { ...blog }
    blogCopy.likes = blogCopy.likes+1
    like(blogCopy)

  }

  const deleteBlogEntry  = async () => {
    if (window.confirm('Do you really want to remove this entry?')) {
      await blogService.remove(blog.id)
    }

  }

  const createdByUser = user.name === blog.author.name

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideRemove = { display: createdByUser ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author.name}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent" id="blog">
        {blog.title} <button onClick={toggleVisibility}>hide</button><br />
        {blog.author.name}<br />
        <p id="numLikes">{blog.likes} <button onClick={handleLike}>Like</button><br /></p>
        {blog.url}<br />
        <div style={hideRemove}>
          <button onClick={deleteBlogEntry}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog