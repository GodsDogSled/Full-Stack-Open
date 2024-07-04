import data from '../../data/diagnoses'
import patientData from '../../data/patients'
import { Diagnoses, Patient, NewPatient, NonPrivatePatientInfo } from '../types'
import { v1 as uuid } from 'uuid'

const allDiagnoses: Diagnoses[] = data
const allPatients: Patient[] = patientData

const getDiagnoses = (): Diagnoses[] => {
  return allDiagnoses
}

const getPatients = (): Patient[] => {
  return allPatients
}

const getNonPrivatePatientInfo = (): NonPrivatePatientInfo[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  }
  allPatients.push(newPatient)
  return newPatient
}

export default {
  getDiagnoses,
  getPatients,
  getNonPrivatePatientInfo,
  addPatient
}