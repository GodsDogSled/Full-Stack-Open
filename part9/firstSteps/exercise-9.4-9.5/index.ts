import express from 'express';
import { calculator } from '../calculator';
const app = express();


app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});



const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});