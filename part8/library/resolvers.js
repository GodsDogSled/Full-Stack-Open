const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: async (root, args) => {
      books.forEach(book => authors.includes(book.author) ? null : authors.push(book.author))
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {

      let books = await Book.find({}).populate('author', { name: 1 })

      if (!args.author && !args.genre) {
        return books
      }
      if (!args.genre) {
        console.log("inside")
        console.log(books.filter(book => book.title === args.author))
        return books.filter(book => book.author.name === args.author)
      }

      return books.filter(book => book.genres.includes(args.genre))
    },
    allAuthors: async (root) => {
      return await Author.find()
    },
    me: async (root, args, context) => {
      return await context.currentUser
    }
  },
  Author: {
    name: (root) => {
      if (!root.name) {
        return root
      }
      return root.name
    },
    born: (root) => {

      return root.born
    },
    bookCount: (root) => {
      const authorsBooks = []
      books.forEach(book => book.author === root.name ? authorsBooks.push(book.title) : null)
      console.log("book count:", root)
      return authorsBooks.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if (!author) {
        author = await new Author({ name: args.author }).save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author,
        genres: args.genres
      })

      try {
        console.log("inisde try", book)
        await book.save()
      } catch (error) {
        console.log("inside catch", book)
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return book
    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo


      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Author birthdate edit failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        }
        )
      }

      return author


    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET), username: user.username, favoriteGenre: user.favoriteGenre }
    },
    logout: async (root, args, context) => {
      let oldUser = context.currentUser
      context.currentUser = null
      return `${oldUser} logged out`
    }

  }
}

module.exports = resolvers