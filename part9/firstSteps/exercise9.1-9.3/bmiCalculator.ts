

const calculateBmi = (height: number, weight: number): String => {
  const heightInMeters = height / 100
  let bmi: number = weight / (heightInMeters * heightInMeters)
  if (bmi < 18.4) {
    return "You a skinny bitch"
  } else if (bmi > 18.4 && bmi < 24.9) {
    return "Normal as body, get a more interesting life"
  } else {
    return "You a fat piece of shit"
  }
}

console.log(calculateBmi(180, 74))