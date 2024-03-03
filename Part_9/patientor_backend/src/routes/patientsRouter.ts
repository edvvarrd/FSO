import express from 'express';
const patientsRouter = express.Router();

import { getPatients, addPatient, findById, addEntry } from '../services/patientService';

import { toNewPatient } from '../utils/toNewPatient';
import { toNewEntry } from '../utils/toNewEntry';

patientsRouter.get('/', (_req, res) => {
	const patients = getPatients();

	res.send(patients);
});

patientsRouter.get('/:id', (req, res) => {
	const patient = findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

patientsRouter.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);

		const addedPatient = addPatient({
			...newPatient,
		});

		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

patientsRouter.post('/:id/entries', (req, res) => {
	try {
		const newEntry = toNewEntry(req.body);

		const addedEntry = addEntry(req.params.id, { ...newEntry });

		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default patientsRouter;
