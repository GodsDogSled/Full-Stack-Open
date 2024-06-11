import { ALL_BOOKS } from '../queries/queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [bookGenres, setBookGenres] = useState([])
  const [genreToShow, setGenreToShow] = useState("show all books")
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  // console.log(result.data.allBooks)
  const books = result.data.allBooks

  if (books.length > 0) {
    books.forEach(book => {
      book.genres.forEach(genre => {
        if (!bookGenres.includes(genre)) {
          console.log(genre)
          setBookGenres([...bookGenres, genre])
        }
      })
    })
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreToShow === "show all books" ?
            books.map(a => {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            })
            : null}
          {books.map((a) => {
            return (
              a.genres.includes(genreToShow)
                ?
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
                :
                null
            )
          })}
        </tbody>
      </table>
      <h4>Filter by genre</h4>
      <button onClick={() => setGenreToShow("show all books")}>Reset Filter</button>
      {bookGenres.map((genre, i) => {
        return (
          <button onClick={() => setGenreToShow(genre)} key={i}>{genre}</button>
        )
      })}
    </div>
  )
}

export default Books
