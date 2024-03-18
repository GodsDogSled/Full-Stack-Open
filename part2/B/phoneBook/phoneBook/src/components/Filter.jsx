const Filter = ({ filter, handleChange }) => {
  return (
    <>
      filter by name:  <input name="filter" onChange={handleChange} value={filter} />
    </>
  )
}

export default Filter