import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    currentVote(state, action) {
      const anecdote = action.payload
      return anecdote
    },

  }
})

export const { currentVote } = notificationSlice.actions

export const setNotification = (message, displayTime) => {
  return async dispatch => {
    dispatch(currentVote(message))
    setTimeout(() => dispatch(currentVote(null)), displayTime * 1000)
  }
}
export default notificationSlice.reducer

