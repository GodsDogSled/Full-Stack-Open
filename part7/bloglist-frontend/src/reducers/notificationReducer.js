import { createSlice, current } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    success: null,
    error: null
  },
  reducers: {
    successNotification(state, action) {
      return {
        success: action.payload,
        error: null
      }
    },
    errorNotification(state, action) {
      return {
        success: null,
        error: action.payload
      }
    },
    resetNotification(state, action) {
      return {
        success: null,
        error: null
      }
    }
  }
})

export const { successNotification, errorNotification, resetNotification } = notificationSlice.actions

export default notificationSlice.reducer

// const notificationSetter = () => {

//   switch (action.type) {
//     case 'SET_NOTIFICATION':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const updateNotification = change => {
//   console.log(change)
//   return {
//     type: "SET_NOTIFICATION",
//     payload: change
//   }
// }

// export const notificationChange = filter => {
//   console.log(filter)
//   const obj = {
//     type: 'SET_NOTIFICATION',
//     payload: filter
//   }
//   return obj
// }

