import { ALL_BOOKS, BOOK_GENRE } from '../queries/queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useState } from 'react'
const Books = (props) => {

  const [queryGenre, setQueryGenre] = useState()
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: null }
  })
  const [getLazyGenres, lazyGenres] = useLazyQuery(BOOK_GENRE);


  const [bookGenres, setBookGenres] = useState([])
  const [genreToShow, setGenreToShow] = useState("show all books")

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }
  // console.log(result.data.allBooks)
  const books = data.allBooks

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

  const handleGenreChange = async (x) => {
    // await getLazyGenres({ variables: { genre: "sci-fi" } })
    // const newResult = { ...lazyGenres.data.allBooks }
    // console.log(newResult)
    console.log(x)
    refetch()
    setGenreToShow(x)
    console.log(data.allBooks)
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
          {/* {books.map((a) => {
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
          })} */}
        </tbody>
      </table>
      <h4>Filter by genre</h4>
      <button onClick={() => refetch({ genre: null })}>Reset Filter</button>
      {bookGenres.map((genre, i) => {
        return (
          <button onClick={() => refetch({ genre: genre })} key={i}>{genre}</button>
        )
      })}
    </div>
  )
}

export default Books
