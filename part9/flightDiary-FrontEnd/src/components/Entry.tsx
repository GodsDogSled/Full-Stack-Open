import { DiaryEntry } from "../types"

export default function Entry({ entry }: { entry: DiaryEntry }) {

  return (
    <li>
      <h3>{entry.date}</h3>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather:  {entry.weather}</p>
    </li>
  )
}
