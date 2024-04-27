const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ANECDOTE":
      return `You created a new new anecdote: ${action.payload}`
    case "VOTE":
      return `You voted for: ${action.payload}`
    case "ERROR":
      return `Anecdote must have length of 5 characters or more`
    case "RESET":
      return null
    default:
      return state
  }
}

export default notificationReducer