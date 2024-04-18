import { useState } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      case 'ZERO':
        return 0
      default: // if none of the above matches, code comes here
        return state
    }
  }

  const store = configureStore({ reducer: counterReducer })

  const [count, setCount] = useState(0)

  return (
    <>
      <div><span>{store.getState()}</span></div><br></br>
      <button
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button>Zero</button>
      <button>Decrease</button>
    </>
  )
}

export default App
