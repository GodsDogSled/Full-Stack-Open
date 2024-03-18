export default function Course({ course }) {
  const exerciseTotal = course.parts.reduce((sum, exercises) => {
    return sum + exercises.exercises
  }, 0)

  return (
    <>
      <h2>{course.name}</h2>
      <h3>Course Parts</h3>
      <ul>
        {course.parts.map(part => {
          return (
            <li key={part.id}>{part.name} {part.exercises}</li>
          )
        })}
      </ul>
      <p>Total # of {exerciseTotal} exercises</p>
    </>
  )
}