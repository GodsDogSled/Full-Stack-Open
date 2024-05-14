import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import notificationReducer from './reducers/notificationReducer'
import blogPostReducer from './reducers/blogPostReducer'
import userReducer from './reducers/userReducer'
import usersListReducer from './reducers/usersListReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogPostReducer,
    user: userReducer,
    users: usersListReducer
  }
})




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)