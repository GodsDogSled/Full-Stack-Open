interface TotalExercise {
  totalExercises: number
}




const Total = (props: TotalExercise) => {
  return (
    <h3>Total number of Exercieses: {props.totalExercises}</h3>
  )
};



export default Total