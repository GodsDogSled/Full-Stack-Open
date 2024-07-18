import data from '../../data/diagnoses'
import patientData from '../../data/patients'
import { Diagnoses, Patient, NewPatient, NonPrivatePatientInfo, EntryWithoutId } from '../types'
import { v1 as uuid } from 'uuid'

const allDiagnoses: Diagnoses[] = data
let allPatients: Patient[] = patientData

const getDiagnoses = (): Diagnoses[] => {
  return allDiagnoses
}

const getPatients = (): Patient[] => {
  return allPatients
}

const getNonPrivatePatientInfo = (): NonPrivatePatientInfo[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
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

const addPatientEntry = (id: string, newEntry: EntryWithoutId) => {
  const foundPatient = allPatients.find(patient => patient.id === id)
  const entryWithId = {
    id: uuid(),
    ...newEntry
  }

  if (foundPatient) {
    if (!foundPatient.entries) {
      foundPatient.entries = [];
    }
    foundPatient.entries.push(entryWithId);

    allPatients = allPatients.map(patient => {
      if (patient.id === id) {
        return {
          ...patient,
          entries: foundPatient.entries // Use the updated entries array
        };
      }
      return patient;
    });

    return entryWithId; // Return the new entry
  }
  return foundPatient
}



const findById = (id: string): Patient | Error => {
  const patient = allPatients.find(patient => patient.id === id)
  if (patient) {
    return patient
  } else {
    return new TypeError("Could not find a patient with that Id")
  }
}

export default {
  getDiagnoses,
  getPatients,
  getNonPrivatePatientInfo,
  addPatient,
  findById,
  addPatientEntry
}