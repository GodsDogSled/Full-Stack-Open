import express from 'express';
import { calculator } from './calculator';
import { calculateExercises } from './exercise9.1-9.3/exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  const datum = req.body;

  return res.json(calculateExercises(datum.daily_exercises, datum.target))

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});