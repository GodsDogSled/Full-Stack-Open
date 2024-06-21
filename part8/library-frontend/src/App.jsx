import { useState, useEffect } from "react";
import { useApolloClient, useSubscription, useMutation, useQuery } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import AddBirthYear from "./components/AddBirthYear"
import LoginForm from "./components/LoginForm";
import Recomended from "./components/Recomended";
import { BOOK_ADDED, ALL_AUTHORS, ALL_BOOKS } from './queries/queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [triggerDataRefetch, setTriggerDataRefetch] = useState(false)
  const [newBook, setNewBook] = useState()

  let allBooks = useQuery(ALL_BOOKS)

  useEffect(() => {

  }, []);

  const client = useApolloClient()

  // const logout = () => {
  //   setToken(null)
  //   localStorage.clear()
  //   client.resetStore()
  // }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log("added book:", addedBook)
      console.log(allBooks)

      setNewBook(addedBook)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        console.log("allBooks variable:", allBooks)
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
      alert(`${data.data.bookAdded.title} added to Book list`)
    }

  })

  const handleRefetch = async () => {
    try {
      await allBooks.refetch().then(({ data }) => {
        console.log(data)
      });

    } catch (error) {
      console.error('Error refetching data:', error);
    }
    // console.log(allBooks.data)
  };

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

      <Authors show={page === "authors"} refetch={triggerDataRefetch} />
      <Recomended show={page === "recomended"} userInfo={userInfo} />

      <Books show={page === "books"} newBook={newBook} />

      <NewBook show={page === "add"} setError={notify} />
      <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken} setUserInfo={setUserInfo} />
      {/* <div>
        <AddBirthYear />
      </div> */}
    </div>

  );
};

export default App;
