const dummy = (blogs) => {
  return 1
}



const totalLikes = (blogPosts) => {
  let likes = 0;
  blogPosts.forEach(post => likes += post.likes)
  return likes
}

const favouriteBlogs = (blogs) => {
  let favouriteBlog = []
  let currentTopLikes = 0;
  blogs.forEach(blog => {
    if (blog.likes > currentTopLikes) {
      currentTopLikes = blog.likes
      favouriteBlog = blog
    }
  })
  return favouriteBlog
}

const mostBlogs = (blogs) => {
  //identify the authors
  authors = []

  blogs.forEach(blog => {
    if (!authors.find(author => author.author === blog.author)) {
      authors.push({ author: blog.author, score: 1 })
    } else {
      let author = authors.findIndex(author => author.author === blog.author)
      authors[author].score++;
    }
  })

  const mostPosts = authors.reduce((mostLiked, currentObject) => {
    if (currentObject.score > mostLiked.score) {
      mostLiked = currentObject;
    }
    return mostLiked;
  }, authors[0])
  return mostPosts
}
const mostLikes = (blogs) => {
  //identify the authors
  authors = []

  blogs.forEach(blog => {
    if (!authors.find(author => author.author === blog.author)) {
      authors.push({ author: blog.author, score: author.likes })
    } else {
      let author = authors.findIndex(author => author.author === blog.author)
      authors[author].score += author.score;
    }
  })

  const mostPosts = authors.reduce((mostLiked, currentObject) => {
    if (currentObject.score > mostLiked.score) {
      mostLiked = currentObject;
    }
    return mostLiked;
  }, authors[0])
  return mostPosts
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlogs,
  mostBlogs,
}