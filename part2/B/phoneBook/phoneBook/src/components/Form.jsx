

const Form = ({ name, number, handleChange, handleSubmit }) => {

  return (
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
          name: <input name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          number: <input name="number" value={number} onChange={handleChange} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">add</button>
        </div>
      </form>

    </div>
  )
}

export default Form