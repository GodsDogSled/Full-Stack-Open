import express from 'express';
const app = express();
import diagnosesRouter from './routes/diagnoses';
const cors = require('cors');
app.use(express.json());
app.use(cors());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pongu');
});
// app.get('/api/diagnoses', (_req, res) => {
//   console.log('someone pinged here');
//   res.send('pongu');
// });

app.use('/api', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});