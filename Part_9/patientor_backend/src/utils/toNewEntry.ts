import {
	Diagnosis,
	Discharge,
	HealthCheckRating,
	NewBaseEntry,
	NewEntry,
	SickLeave,
} from '../types';

import { isString, isNumber, isDate } from './utils';

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}

	return description;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date');
	}

	return date;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}

	return specialist;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
	if (
		typeof HealthCheckRating === 'undefined' ||
		!isNumber(healthCheckRating) ||
		!isHealthCheckRating(healthCheckRating)
	) {
		throw new Error('Incorrect or missing healthCheckRating');
	}
	return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
	if (!discharge || typeof discharge !== 'object') {
		throw new Error('Incorrect or missing Discharge');
	}
	if (!('date' in discharge) || !isString(discharge.date) || !isDate(discharge.date)) {
		throw new Error('Incorrect or missing Discharge date');
	}
	if (!('criteria' in discharge) || !isString(discharge.criteria)) {
		throw new Error('Incorrect or missing Discharge criteria');
	}

	return {
		date: discharge.date,
		criteria: discharge.criteria,
	};
};

const parseEmployerName = (employerName: unknown): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Incorrect or missing Employer name');
	}

	return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
	if (!sickLeave || typeof sickLeave !== 'object') {
		throw new Error('Incorrect or missing Sick leave');
	}
	if (
		!('startDate' in sickLeave) ||
		!isString(sickLeave.startDate) ||
		!isDate(sickLeave.startDate)
	) {
		throw new Error('Incorrect or missing Sick leave start date');
	}
	if (!('endDate' in sickLeave) || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
		throw new Error('Incorrect or missing Sick leave end date');
	}
	return {
		startDate: sickLeave.startDate,
		endDate: sickLeave.endDate,
	};
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
	if (!diagnosisCodes) {
		return [] as Array<Diagnosis['code']>;
	}

	return diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): NewEntry => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if (!('description' in object && 'date' in object && 'specialist' in object)) {
		throw new Error('Incorrect data: some fields are missing.');
	}

	const baseEntry: NewBaseEntry = {
		description: parseDescription(object.description),
		date: parseDate(object.date),
		specialist: parseSpecialist(object.specialist),
	};

	if ('diagnosisCodes' in object) {
		baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
	}

	if (!('type' in object) || !isString(object.type)) {
		throw new Error('Incorrect or missing type');
	}

	switch (object.type) {
		case 'HealthCheck': {
			if (!('healthCheckRating' in object)) {
				throw new Error('Missing healthCheckRating');
			}
			const healthCheckEntry: NewEntry = {
				type: object.type,
				healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
				...baseEntry,
			};
			return healthCheckEntry;
		}
		case 'Hospital': {
			if (!('discharge' in object)) {
				throw new Error('Missing Discharge');
			}
			const hospitalEntry: NewEntry = {
				type: object.type,
				discharge: parseDischarge(object.discharge),
				...baseEntry,
			};
			return hospitalEntry;
		}
		case 'OccupationalHealthcare': {
			if (!('employerName' in object)) {
				throw new Error('Missing Employer name');
			}
			const occupationalHealthcareEntry: NewEntry = {
				type: object.type,
				employerName: parseEmployerName(object.employerName),
				...baseEntry,
			};
			if ('sickLeave' in object) {
				occupationalHealthcareEntry.sickLeave = parseSickLeave(object.sickLeave);
			}
			return occupationalHealthcareEntry;
		}
		default:
			throw new Error('Incorrect Entry type');
	}
};
