import { ALL_BOOKS } from '../queries/queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'


const Recomended = ({ show, userInfo }) => {
  const result = useQuery(ALL_BOOKS)
  const [bookGenres, setBookGenres] = useState([])
  const [genreToShow, setGenreToShow] = useState('')
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const g = userInfo.favoriteGenre
  // console.log(result.data.allBooks)
  const books = result.data.allBooks

  // if (books.length > 0) {
  //   books.forEach(book => {
  //     book.genres.forEach(genre => {
  //       if (!bookGenres.includes(genre)) {
  //         console.log(genre)
  //         setBookGenres([...bookGenres, genre])
  //       }
  //     })
  //   })
  // }

  console.log(genreToShow)

  return (
    <div>
      <h4>books in your favourite genre of: {g}</h4>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            return (
              a.genres.includes(g)
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
    </div>
  )
}

export default Recomended
