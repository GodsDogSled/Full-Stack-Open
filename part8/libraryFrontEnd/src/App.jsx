import { gql, useQuery, useApolloClient } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import LoginForm from './components/LoginForm'
import PhoneForm from './components/PhoneForm'
import { useState } from 'react'
import { ALL_PERSONS } from './queries/queries'



const App = () => {
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()
  console.log("result", result.data)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }



  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }



  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default App