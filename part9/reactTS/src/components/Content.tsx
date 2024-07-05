interface Content {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: Content[]
}

const ContentList = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(part => {
        return (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        )
      })}
    </>
  )
};



export default ContentList