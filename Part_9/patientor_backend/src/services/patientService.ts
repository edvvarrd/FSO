import { Patient, NonSensitivePatient, newPatient } from '../types';

import { v1 as uuid } from 'uuid';

import data from '../data/patients';

export const getPatients = (): NonSensitivePatient[] => {
	return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export const addPatient = (patient: newPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...patient,
	};
	data.push(newPatient);
	return newPatient;
};
