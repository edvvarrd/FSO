import express from 'express';
const diagnosesRouter = express.Router();

import { getDiagnoses } from '../services/diagnoseService';

diagnosesRouter.get('/', (_req, res) => {
	const diagnoses = getDiagnoses();
	res.send(diagnoses);
});

export default diagnosesRouter;
