
export const calculateBmi = (height: number, weight: number): String => {
  const heightInMeters = height / 100
  let bmi: number = weight / (heightInMeters * heightInMeters)
  if (bmi < 18.4) {
    return "You a skinny guy"
  } else if (bmi > 18.4 && bmi < 24.9) {
    return "Normal body, get a more interesting life"
  } else {
    return "You are higher on bmi"
  }
}

