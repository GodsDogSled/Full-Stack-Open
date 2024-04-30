const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_BLOG":
      return `New Blog Posted: ${action.payload}`
    case "LIKE":
      return `You liked : ${action.payload}`
    case "ERROR":
      return `Blog post error`
    case "RESET":
      return null
    default:
      return state
  }
}

export default notificationReducer