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
query AllBookies($genre: String)  {
    allBooks(genre: $genre)  {
      title,
      published
      genres
      author{
        name
        born
      }
    }
  }
`

export const BOOK_GENRE = gql`
  query {
    allBooks{
      title
      published
      author{
        name
      }
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name 
      born
    }
  }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author{
      name
    }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`