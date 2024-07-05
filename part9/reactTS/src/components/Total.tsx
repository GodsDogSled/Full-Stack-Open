interface TotalExercise {
  totalExercises: number
}



const Total = (props: TotalExercise) => {
  return (
    <p>Total number of Exercieses: {props.totalExercises}</p>
  )
};



export default Total