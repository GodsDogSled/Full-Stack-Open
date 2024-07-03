import data from '../../data/diagnoses'
import patientData from '../../data/patients'
import { Diagnoses, Patient, NonPrivatePatientInfo } from '../types'

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

export default {
  getDiagnoses,
  getPatients,
  getNonPrivatePatientInfo
}