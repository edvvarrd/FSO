import express from 'express';
const patientsRouter = express.Router();

import { getPatients, addPatient } from '../services/patientService';

import { toNewPatient } from '../utils';

patientsRouter.get('/', (_req, res) => {
	const patients = getPatients();

	res.send(patients);
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

export default patientsRouter;
