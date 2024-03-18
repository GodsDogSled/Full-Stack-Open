import { useState } from 'react'
import Form from './components/Form';
import Phonebook from './components/Phonebook';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { useEffect } from 'react';

import contactServices from './services/contacts'

const App = () => {
  const [people, setPeople] = useState([])
  const [inputError, setInputError] = useState();

  useEffect(() => {
    contactServices.getAll().then(initialContacts => {

      setPeople(initialContacts);
    })
  }, [])

  const [newName, setNewName] = useState('New Name...')
  const [newNumber, setNewNumber] = useState('New Number...')
  const [newFilter, setNewFilter] = useState("");

  const handleChange = (event) => {
    let inputName = event.target.name;
    let newValue = event.target.value;

    switch (inputName) {
      case "name":
        setNewName(newValue);
        break;
      case "number":
        setNewNumber(newValue);
        break;
      case "filter":
        setNewFilter(newValue);
        break;
      default:
        alert("error in form");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    console.log(contactObject)
    const dupeCheck = people.find((person) => person.name === contactObject.name)
    if (dupeCheck) {
      if (window.confirm(`${dupeCheck.name} is already in the phone book, do you want to replace the old number with a new one?`)) {
        const changedContact = { ...dupeCheck, number: newNumber }
        contactServices.updateNumber(dupeCheck.id, changedContact).then(
          setPeople(people.map(person => person.id !== dupeCheck.id ? person : changedContact))
        )
      }
      return false;
    }

    contactServices.create(contactObject).then(returnedContact => {
      setPeople(people.concat(returnedContact))
      setNewName("")
      setNewNumber("")
      setInputError(null)
    }).catch(error => {
      setInputError(error.response.data.error)
    })
  }

  const handleRemove = (id) => {
    const person = people.find(person => person.id === id)
    if (window.confirm("Do you really want to remove " + person.name + "?")) {
      contactServices.remove(id).then(
        setPeople(people.filter(p => p.id !== id))
      )
    }
  }

  return (
    <>

      <Filter filter={newFilter} handleChange={handleChange} />
      <Notification message={inputError} />
      <Form
        name={newName}
        number={newNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Phonebook contacts={people} filter={newFilter} handleRemove={handleRemove} />
    </>
  )
}

export default App
