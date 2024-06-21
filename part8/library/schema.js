const typeDefs = `
  type Author {
    name: String
    born:Int
    bookCount: Int
  }
  
  type Book {
    title: String
    author: Author!
    published: String
    genres: [String!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
    username: String
    favoriteGenre: String
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre:String): [Book!]!
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    logout(
      message: String
    ): String
  }
`

module.exports = typeDefs