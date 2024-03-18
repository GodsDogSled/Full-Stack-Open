import axios from "axios"
const Note = ({ note, toggleImportance }) => {

  let lable = note.important ? "remove importance" : "make important"



  return (
    <li className="note">{note.content}
      <button onClick={() => toggleImportance(note.id)}>{lable}</button>
    </li>
  )
}

export default Note