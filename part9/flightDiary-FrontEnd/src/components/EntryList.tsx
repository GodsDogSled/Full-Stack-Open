import { DiaryEntry } from "../types"
import Entry from "./Entry"

interface EntryListProp {
  diaryEntries: DiaryEntry[]
}

const EntryList = (props: EntryListProp) => {

  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {props.diaryEntries.map((entry: DiaryEntry, i) => {
          return (
            <Entry key={i} entry={entry} />
          )
        })}
      </ul>
    </div>
  )
}

export default EntryList