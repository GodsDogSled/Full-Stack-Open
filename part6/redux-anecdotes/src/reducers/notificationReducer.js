import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    currentVote(state, action) {
      const anecdote = action.payload
      return anecdote
    }
  }
})

export const { currentVote } = notificationSlice.actions
export default notificationSlice.reducer

