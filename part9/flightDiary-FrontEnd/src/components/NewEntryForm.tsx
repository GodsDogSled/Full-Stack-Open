import { NewDiaryEntry, Weather, Visibility } from "../types"
import { useState, SyntheticEvent } from "react"


interface NewEntryFormProps {
  updateNewEntry: (newEntry: NewDiaryEntry) => void
}

const NewEntryForm = (props: NewEntryFormProps) => {
  const [weather, setWeather] = useState(Weather.Rainy)
  const [visibility, setVisibility] = useState(Visibility.Poor)
  const [comment, setComment] = useState("")
  const [date, setDate] = useState("")

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }
    props.updateNewEntry(newEntry)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>New Diary Entry</h2>
      <label >Date</label>
      <input type="date" onChange={({ target }) => setDate(target.value)} />
      <label>Weather</label>
      <input type="text" onChange={({ target }) => setWeather(target.value as Weather)} />
      <label>Visibility</label>
      <input type="text" onChange={({ target }) => setVisibility(target.value as Visibility)} />
      <label >Comments</label>
      <input type="text" onChange={({ target }) => setComment(target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default NewEntryForm