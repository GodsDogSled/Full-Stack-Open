import { useEffect, useState } from 'react'
import CountryInfo from './components/CountryInfo.jsx'

import axios from 'axios'

import './App.css'

function App() {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState(null)
  const [results, setResults] = useState([])


  useEffect(() => {
    axios.get(baseUrl).then(res => {
      setCountries(res.data)
    })
  }, [])


  const handleSearch = (event) => {
    setSearch(event.target.value)
    const display = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    setResults(display)
  }

  const handleShow = (c) => {
    setResults([c])
  }

  return (
    <>
      <div>
        search country
        <input type="text" onChange={() => handleSearch(event)} value={search} />
      </div>
      <div >
        {
          (results.length > 10)
            ?
            search !== "" ? <p>too many resutls</p> : ""
            :
            results.length === 1
              ? <CountryInfo country={results[0]} />
              :
              <ul>
                {results.map(country => {
                  return (
                    <li key={country.id}>{country.name.common}<button onClick={() => handleShow(country)}>show</button></li>
                  )
                })}
              </ul>
        }


      </div>

    </>
  )
}

export default App
