import data from '../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = data;

export const getDiagnoses = () => {
	return diagnoses;
};
