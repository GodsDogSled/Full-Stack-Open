import express from 'express';
import diaryService from '../services/diaryService';

const diaryRouter = express.Router();

diaryRouter.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

diaryRouter.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default diaryRouter;