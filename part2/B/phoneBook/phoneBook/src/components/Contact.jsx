const Contact = ({ person, handleRemove }) => {

  return (
    <li>{person.name} -- {person.number}
      <button onClick={() => handleRemove(person.id)}>Remove Contact</button>
    </li>
  )
}

export default Contact