import { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from "./services/contacts.js"

const Input = ({ title, onChange, value }) => {
  return (
    <div>
      {title}: <input onChange={onChange} value={value} />
    </div>
  )
}

const Filter = ({ searchResutls }) => {
  return (
    <ul>
      {searchResutls.map(person => {
        return (
          <li key={person.id}>{person.name} {person.number}</li>
        )
      })}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchResutls, setSearchResults] = useState([])
  const [newName, setNewName] = useState("add a new name")
  const [newNumber, setNewNumber] = useState("add number")
  const [filterSearch, setFilterSearch] = useState("")

  useEffect(() => {

    // axios.get('http://localhost:3002/persons').then(response => {
    //   console.log('promis fufilled ')
    //   setPersons(response.data);
    // })

    contactService.getAll().then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilterSearch(event.target.value)
    const results = persons.filter((person) => person.name.includes(filterSearch))
    setSearchResults(results);
  }

  const handleDelete = (name, id) => {
    contactService.remove(id, name).then(res => {
      contactService.getAll().then(initialContacts => {
        setPersons(initialContacts)
      })
    })





    // contactService.getAll().then(newContacts => {

    //   setPersons(newContacts)
    // })
  }
  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
    }

    const duplicateName = persons.find((person) => person.name === newName)
    const duplicateNumber = persons.find((person) => person.number === newNumber);

    if (!duplicateName && !duplicateNumber) {
      contactService.create(contactObject).then(newContact => {
        setPersons(persons.concat(newContact));
        console.log(newContact)
      })
    } else {
      if (window.confirm(` ${duplicateName.name} is already in the phone book. Do you want to replace their number with the new one?`)) {
        const changedContact = { ...duplicateName, number: newNumber }
        contactService.update(duplicateName.id, duplicateName.name, changedContact).then(returnedContact => {
          returnedContact ? setPersons(persons.map(person => person.id !== duplicateName.id ? person : returnedContact)) : ""
        })
      }
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>debug: {filterSearch}</div>
      <Input title={"Search Contacts"} onChange={handleFilter} value={filterSearch} />
      <Filter searchResutls={searchResutls} />
      <h2>New Contact</h2>
      <form onSubmit={addContact}>
        <Input title={"name"} onChange={handleNewName} value={newName} />
        <Input title={"number"} onChange={handleNewNumber} value={newNumber} />
        <div>
          <button type="submit" >add</button>
        </div>
      </form >
      <h3>Numbers</h3>
      <ul>
        {persons.map(person => {
          return (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person.name, person.id)}>delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App