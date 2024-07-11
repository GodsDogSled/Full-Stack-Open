import { useState, useEffect } from 'react'
import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "./types";
import diaryService from "./services/newEntryService"
import EntryList from './components/EntryList';
import Error from './components/Error';
import NewEntryForm from './components/NewEntryForm';

import './App.css'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<string>(String)

  const updateNewEntry = async (newEntryForm: NewDiaryEntry) => {
    const newDiaryEntry = {
      ...newEntryForm,
      id: Math.floor(Math.random() * 999999999999999)
    }

    try {
      await diaryService.create(newDiaryEntry)
      diaryEntries.concat(newDiaryEntry)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaryEntries(data)
    })
  })

  return (
    <>
      <EntryList diaryEntries={diaryEntries} />
      <NewEntryForm updateNewEntry={updateNewEntry} />
      <Error error={error} />
    </>
  )
}

export default App
