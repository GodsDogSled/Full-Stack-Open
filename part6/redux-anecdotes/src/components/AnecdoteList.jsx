import { useDispatch, useSelector } from "react-redux"
import { castVote } from "../reducers/anecdoteReducer"
import { currentVote } from "../reducers/notificationReducer"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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

  const handleVote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5))
  }

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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
