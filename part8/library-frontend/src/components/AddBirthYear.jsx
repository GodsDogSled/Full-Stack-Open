import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries/queries"
import { useMutation } from '@apollo/client'
import Select from 'react-select';
const AddBirthYear = (props) => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState("Slect an Author")

  const authorData = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
    // onError: (error) => {
    //   const messages = error.graphQLErrors.map(e => e.message).join('\n')
    //   setError(messages)
    // }
  })

  if (authorData.loading) {
    return (
      <div>
        loading..
      </div>
    )
  }


  const authors = authorData.data.allAuthors

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })

  const submit = async (event) => {
    let author = selectedAuthor.value
    event.preventDefault()

    editAuthor({ variables: { author, year } })
    // setTitle('')
    // setPublished('')
    // setName('')
    // setGenres([])
    // setGenre('')
  }


  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Author
          {/* <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          /> */}
          <Select
            defaultValue={"dasf"}
            onChange={setSelectedAuthor}
            options={options}
          />

        </div>
        <div>
          Born
          <input
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default AddBirthYear