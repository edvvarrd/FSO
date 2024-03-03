import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';

import axios from 'axios';

import { Patient, Diagnosis, Entry, OccupationalHealthcareEntry, NewEntry } from '../../types';

import { Alert, Box, Divider, Button } from '@mui/material';

import {
	Female,
	Male,
	QuestionMark,
	LocalHospital,
	HealthAndSafety,
	Work,
	MonitorHeart,
} from '@mui/icons-material';

import AddEntryModal from '../AddEntryModal';

const GenderIcon = ({ gender }: { gender: Patient['gender'] }) => {
	switch (gender) {
		case 'female':
			return <Female />;
		case 'male':
			return <Male />;
		default:
			return <QuestionMark />;
	}
};

const EntryType = ({
	entryType,
	employerName,
}: {
	entryType: Entry['type'];
	employerName?: OccupationalHealthcareEntry['employerName'];
}) => {
	switch (entryType) {
		case 'Hospital':
			return <LocalHospital />;
		case 'HealthCheck':
			return <HealthAndSafety />;
		case 'OccupationalHealthcare':
			return (
				<>
					<Work /> {employerName}
				</>
			);
		default:
			const exhaustiveCheck: never = entryType;
			throw new Error(`Unhandled case: ${exhaustiveCheck}`);
	}
};

const EntrySpecific = ({ entry }: { entry: Entry }) => {
	switch (entry.type) {
		case 'Hospital':
			return entry.discharge ? (
				<p>
					Discharge: {entry.discharge.date} - {entry.discharge.criteria}
				</p>
			) : null;
		case 'HealthCheck':
			switch (entry.healthCheckRating) {
				case 0:
					return <MonitorHeart sx={{ color: 'green' }} />;
				case 1:
					return <MonitorHeart sx={{ color: '#FFE135' }} />;
				case 2:
					return <MonitorHeart sx={{ color: 'orange' }} />;
				case 3:
					return <MonitorHeart sx={{ color: 'red' }} />;
				default:
					return <MonitorHeart />;
			}
		case 'OccupationalHealthcare':
			return entry.sickLeave ? (
				<p>
					Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
				</p>
			) : null;
		default:
			const exhaustiveCheck: never = entry;
			throw new Error(`Unhandled case: ${exhaustiveCheck}`);
	}
};

const SinglePatient = () => {
	const [patient, setPatient] = useState<Patient>();
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalError, setModalError] = useState<string>();
	const [error, setError] = useState<string>();
	const { id } = useParams();

	useEffect(() => {
		const fetchPatient = async (id: string): Promise<void> => {
			const patient = await patientService.getOne(id);
			setPatient(patient);
		};
		void fetchPatient(id as string).catch((e: unknown) => {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === 'string') {
					const message = e.response.data.replace('Something went wrong. Error: ', '');
					console.error(message);
					setError(message);
				} else {
					setError('Unrecognized axios error');
				}
			} else {
				console.error('Unknown error', e);
				setError('Unknown error');
			}
		});

		const fetchDiagnosis = async (): Promise<void> => {
			const diagnoses = await diagnosisService.getAll();
			setDiagnoses(diagnoses);
		};

		void fetchDiagnosis();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getDiagnosisName = (code: string): Diagnosis['code'] => {
		const diagnosis = diagnoses.find(d => d.code === code);
		return diagnosis ? diagnosis.name : 'Not found';
	};

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setModalError(undefined);
	};

	const addNewEntry = async (values: NewEntry) => {
		if (patient) {
			try {
				const addedEntry = await patientService.addEntry(patient.id, values);
				setPatient({ ...patient, entries: [...patient.entries, addedEntry as Entry] });
				closeModal();
			} catch (e: unknown) {
				if (axios.isAxiosError(e)) {
					if (e?.response?.data && typeof e?.response?.data === 'string') {
						const message = e.response.data.replace('Something went wrong. Error: ', '');
						console.error(message);
						setModalError(message);
					} else {
						setModalError('Unrecognized axios error');
					}
				} else {
					console.error('Unknown error', e);
					setModalError('Unknown error');
				}
			}
		}
	};

	if (error) {
		return (
			<div>
				<Alert severity="error" sx={{ my: 3 }}>
					{error}
				</Alert>
			</div>
		);
	}

	if (patient) {
		return (
			<div>
				<h2 style={{ display: 'flex', alignItems: 'center', gap: '.5em' }}>
					{patient.name} <GenderIcon gender={patient.gender} />
				</h2>
				<ul>
					<li>SSN: {patient.ssn}</li>
					<li>Date of Birth: {patient.dateOfBirth}</li>
					<li>Occupation: {patient.occupation}</li>
				</ul>
				<h3>Entries</h3>
				{patient.entries.map(entry => (
					<Box
						component="section"
						sx={{ border: '2px solid grey', my: 1, p: 1 }}
						borderRadius={1}
						key={entry.id}>
						<p style={{ display: 'flex', alignItems: 'center', gap: '.5em' }}>
							{entry.date}{' '}
							<EntryType
								entryType={entry.type}
								employerName={
									entry.type === 'OccupationalHealthcare' ? entry.employerName : undefined
								}
							/>
						</p>
						<Divider />
						<p>{entry.description}</p>
						{entry.diagnosisCodes && (
							<ul>
								{entry.diagnosisCodes.map(code => (
									<li key={code}>
										{code} {getDiagnosisName(code)}
									</li>
								))}
							</ul>
						)}
						<EntrySpecific entry={entry} />
						<Divider />
						<p>
							Diagnose by <i>{entry.specialist}</i>
						</p>
					</Box>
				))}
				<AddEntryModal
					onSubmit={addNewEntry}
					modalOpen={modalOpen}
					modalError={modalError}
					onClose={closeModal}
					diagnoses={diagnoses}
				/>
				<Button variant="contained" onClick={() => openModal()}>
					Add New Entry
				</Button>
			</div>
		);
	}

	return (
		<div>
			<p>Looking for a patient...</p>
		</div>
	);
};

export default SinglePatient;
