import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();



app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'Invalid height or weight parameters' });
  }
  return res.json(calculateBmi(height, weight))
})
app.post('/exerciseCalc', (req, res) => {

  console.log(req.body)
  return res.json("calc exercise")



})

app.post('/calculate', (req, res) => {


  // if (!value1 || isNaN(Number(value1))) {
  //   return res.status(400).send({ error: '...' });
  // }
  console.log(req)
  return res.json("hello")

});

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
