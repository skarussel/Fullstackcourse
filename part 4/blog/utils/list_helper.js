// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  blogs.forEach(blog => {
    totalLikes += blog.likes

  })

  return totalLikes
}

const favoriteBlog = (blogs) => {
  let favBlog
  blogs.forEach(blog => {
    if (!favBlog) {
      favBlog = blog
    }
    else if (blog.likes > favBlog.likes){
      favBlog = blog
    }
  })
  return {
    'title': favBlog.title,
    'author': favBlog.author,
    'likes': favBlog.likes
  }
}

const mostBlogs = (blogs) => {
  let authors = {}
  blogs.forEach(blog => {
    if (blog.author in authors){
      authors[blog.author]+=1
    }
    else {
      authors[blog.author] = 1
    }
  })

  const max = (Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b))
  return {
    'author': max,
    'blogs': authors[max]
  }

}

const mostLikes = (blogs) => {
  let authors = {}
  blogs.forEach(blog => {
    if (blog.author in authors){
      authors[blog.author]+=blog.likes
    }
    else {
      authors[blog.author] = blog.likes
    }
  })

  const max = (Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b))
  return {
    'author': max,
    'likes': authors[max]
  }

}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}