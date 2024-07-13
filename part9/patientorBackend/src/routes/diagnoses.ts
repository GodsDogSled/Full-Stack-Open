import express from "express";
import diagnosesService from "../services/diagnosesService";
import toNewPatient from '../utils'


const diagnosesRouter = express.Router()

diagnosesRouter.get('/diagnoses', (_req, res) => {
  res.send(diagnosesService.getDiagnoses())
});
diagnosesRouter.get('/patients', (_req, res) => {
  res.send(diagnosesService.getNonPrivatePatientInfo())
});

diagnosesRouter.get('/patients/:id', (_req, res) => {
  try {
    const patient = diagnosesService.findById(String(_req.params.id));
    res.send(patient)
  } catch (error: unknown) {
    let errorMessage = "getting patient by Id error."
    if (error instanceof Error) {
      errorMessage += "Error:" + error.message
    }
  }
})

diagnosesRouter.post('/patients', (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body)
    const addedPatient = diagnosesService.addPatient(newPatient)
    res.send(addedPatient)
  } catch (error: unknown) {
    let errorMessage = "something went wrong"
    if (error instanceof Error) {
      errorMessage += "Error" + error.message
    }
  }
})

export default diagnosesRouter
