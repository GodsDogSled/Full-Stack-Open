import Contact from "./Contact"
const Phonebook = ({ contacts, filter, handleRemove }) => {


  let lowerCaseFilter = filter.toLowerCase();

  //new filtered array
  let filteredContactsArray = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(lowerCaseFilter)
  );


  const unfilterdContacts = contacts.map(contact => (
    <Contact key={contact.id} person={contact} handleRemove={handleRemove} />
  ))

  const filteredContacts = filteredContactsArray.map(contact => (
    <Contact key={contact.id} person={contact} handleRemove={handleRemove} />
  ))


  let arrayToShow = (filter) ? filteredContacts : unfilterdContacts


  return (
    <>
      <h3>Numbers</h3>

      <ul>
        {arrayToShow}
      </ul>
    </>
  )
}

export default Phonebook
