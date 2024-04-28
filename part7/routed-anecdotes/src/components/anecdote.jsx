import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {

  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id))
  return (
    <>
      <h3>{anecdote.content}</h3>
      <div>has {anecdote.votes} votes</div>
      <p>{anecdote.author}</p>
      <p>for more info visit:<a href={anecdote.info}> {anecdote.info}</a></p>
    </>
  )
}

export default Anecdote