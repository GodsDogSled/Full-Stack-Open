import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query  {
  allAuthors  {
    name,
    born,
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query  {
    allBooks  {
      title,
      author 
      published,
    }
  }
`
export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}`

export const UPDATE_AUTHOR = gql`
mutation editAuthor($author: String!, $year: Int!){
  editAuthor(
    name: $author
    setBornTo: $year
  ){
  name
  born
  }
}
`