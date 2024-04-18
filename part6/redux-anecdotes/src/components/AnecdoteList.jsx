import { useDispatch, useSelector } from "react-redux"
import { castVote } from "../reducers/anecdoteReducer"

export default function AnecdoteList() {

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes
    }
    return anecdotes.filter((obj) =>
      obj.content.toLowerCase().includes(filter)
    )



  })
  const dispatch = useDispatch()


  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(castVote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
