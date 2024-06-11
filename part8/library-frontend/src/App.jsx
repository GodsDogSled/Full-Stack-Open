import { useState } from "react";
import { useApolloClient } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import AddBirthYear from "./components/AddBirthYear"
import LoginForm from "./components/LoginForm";
import Recomended from "./components/Recomended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleLogin = () => {
    token ? setToken(null) : setPage("login")
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <h3>{errorMessage}</h3>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>

        <button onClick={() => console.log(userInfo)}>See User</button>
        {token ? <button onClick={() => setPage("books")}>Books</button> : null}
        {token ? <button onClick={() => setPage("add")}>Add book</button> : null}
        {token ? <button onClick={() => setPage("recomended")}>Reccomended</button> : null}
        <button onClick={() => handleLogin()}>{token ? "logoutt" : "login"}</button>

      </div>

      <Authors show={page === "authors"} />
      <Recomended show={page === "recomended"} userInfo={userInfo} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />
      <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken} setUserInfo={setUserInfo} />
      <div>
        <AddBirthYear />
      </div>
    </div>

  );
};

export default App;
