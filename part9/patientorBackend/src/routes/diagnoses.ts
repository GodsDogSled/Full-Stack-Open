import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = express.Router()

diagnosesRouter.get('/diagnoses', (_req, res) => {
  res.send(diagnosesService.getDiagnoses())
});
diagnosesRouter.get('/patients', (_req, res) => {
  res.send(diagnosesService.getNonPrivatePatientInfo())
});

export default diagnosesRouter
