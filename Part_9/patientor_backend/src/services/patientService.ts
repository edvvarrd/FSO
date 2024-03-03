import { Patient, NonSensitivePatient, newPatient, NewEntry, Entry } from '../types';

import { v1 as uuid } from 'uuid';

import patients from '../data/patients';

export const getPatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export const findById = (id: string): Patient | undefined => {
	const patient = patients.find(entry => entry.id === id);
	return patient;
};

export const addPatient = (patient: newPatient): Patient => {
	const newPatient = {
		id: uuid(),
		entries: [],
		...patient,
	};
	patients.push(newPatient);
	return newPatient;
};

export const addEntry = (id: Patient['id'], entry: NewEntry): Entry => {
	const patient = findById(id);
	if (!patient) {
		throw new Error('Patient not found');
	}
	const newEntry = {
		id: uuid(),
		...entry,
	};
	patient.entries.push(newEntry);
	return newEntry;
};
