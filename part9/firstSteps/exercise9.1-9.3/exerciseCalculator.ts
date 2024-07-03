interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (args: number[], targetNumber: number): ExerciseResults => {
  const goalTrainingDays = targetNumber
  const daysTrained = args.filter(arg => arg > 0 ? arg : null)
  const calcAverage = () => {
    const totalTime = daysTrained.reduce((acc: number, day: number) => acc + day, 0)
    return totalTime / daysTrained.length
  }
  const isSuccess = (daysTrained.length > 5) ? true : false
  const calcRating = daysTrained.length / goalTrainingDays
  const ratingDescription = (): string => {
    if (calcRating < .33) return "You did really bad";
    if (calcRating < .66) return "Not bad, but could be better"
    if (calcRating > 1) return "You did a damn good job"
    return `calc error - ${calcRating}`
  }
  return {
    periodLength: args.length,
    trainingDays: daysTrained.length,
    success: isSuccess,
    rating: calcRating,
    ratingDescription: ratingDescription(),
    target: goalTrainingDays,
    average: calcAverage()
  }
}


const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
const c: number = Number(process.argv[4])
const d: number = Number(process.argv[5])
const e: number = Number(process.argv[6])
const f: number = Number(process.argv[7])
const g: number = Number(process.argv[8])
const h: number = Number(process.argv[9])

console.log(calculateExercises([a, b, c, d, e, f, g], h))