import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'
import notificationReducer from './reducers/notificationReducer'


import { getAnecdotes, updateAnecdote } from './requests'



const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const handleVote = (anecdote) => {
    castVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: "VOTE", payload: anecdote.content })
  }
  const castVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: async (newAnecdote) => {
      const anecdotes = await queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== newAnecdote.id ? a : newAnecdote));
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  if (result.isPending) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>Anecdote service unavailable due to {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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
    </NotificationContext.Provider>
  )
}

export default App
