import { useState, SyntheticEvent } from 'react';

import {
	TextField,
	Grid,
	Button,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material';

import { EntryType, NewEntry, Diagnosis, HealthCheckRating } from '../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: NewEntry) => void;
	diagnoses: Diagnosis[];
}

interface EntryTypeOption {
	value: NewEntry['type'];
	label: string;
}

const typeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
	value: v,
	label: v.toString(),
}));

interface HealthCheckRatingOption {
	value: number;
	label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating)
	.filter(value => typeof value === 'number')
	.map(v => ({
		value: Number(v),
		label: HealthCheckRating[Number(v)],
	}));

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [type, setType] = useState(EntryType.HealthCheckEntry);
	const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
	const [dischargeDate, setDischargDate] = useState('');
	const [dischargCriteria, setDischargCriteria] = useState('');
	const [sickLeaveStart, setSickLeaveStart] = useState('');
	const [sickLeaveEnd, setSickLeaveEnd] = useState('');
	const [employerName, setEmployerName] = useState('');

	const onTypeChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if (typeof event.target.value === 'string') {
			const value = event.target.value;
			const type = Object.values(EntryType).find(t => t.toString() === value);
			if (type) {
				setType(type);
			}
		}
	};

	const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
		event.preventDefault();

		if (typeof event.target.value === 'number') {
			const value = event.target.value;
			const healthCheckRating = Object.keys(HealthCheckRating).find(h => Number(h) === value);
			if (healthCheckRating) {
				setHealthCheckRating(Number(healthCheckRating));
			}
		}
	};

	const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
		event.preventDefault();
		const value = event.target.value;
		setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
	};

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		const baseEntry: Omit<NewEntry, 'type'> = {
			description,
			date,
			specialist,
		};
		if (diagnosisCodes) {
			baseEntry.diagnosisCodes = diagnosisCodes;
		}
		switch (type) {
			case 'HealthCheck':
				const healthCheckEntry = {
					...baseEntry,
					type,
					healthCheckRating,
				};
				onSubmit(healthCheckEntry);
				break;
			case 'Hospital':
				const hospitalEntry = {
					...baseEntry,
					type,
					discharge: {
						date: dischargeDate,
						criteria: dischargCriteria,
					},
				};
				onSubmit(hospitalEntry);
				break;
			case 'OccupationalHealthcare':
				const occupationalHealthcareEntry: NewEntry = {
					...baseEntry,
					type,
					employerName,
				};
				if (sickLeaveStart !== '' && sickLeaveEnd !== '') {
					occupationalHealthcareEntry.sickLeave = {
						startDate: sickLeaveStart,
						endDate: sickLeaveEnd,
					};
				}
				onSubmit(occupationalHealthcareEntry);
				break;
		}
	};

	return (
		<div>
			<form onSubmit={addEntry}>
				<InputLabel sx={{ marginBottom: 1 }}>Entry type</InputLabel>
				<Select
					label="Type"
					fullWidth
					value={type}
					onChange={onTypeChange}
					sx={{ marginBottom: 2 }}>
					{typeOptions.map(option => (
						<MenuItem key={option.label} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
				<TextField
					label="Description"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
					sx={{ marginBottom: 1 }}
				/>
				<InputLabel sx={{ my: 1 }}>Date</InputLabel>
				<TextField
					type="date"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
					sx={{ marginBottom: 1 }}
				/>
				<TextField
					label="Specialist"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
					sx={{ my: 1 }}
				/>
				{diagnoses && (
					<>
						<InputLabel sx={{ my: 1 }}>Diagnosis codes</InputLabel>
						<Select
							label="Diagnosis codes"
							fullWidth
							multiple
							value={diagnosisCodes}
							onChange={onDiagnosisChange}
							sx={{ marginBottom: 2 }}>
							{diagnoses.map(option => (
								<MenuItem key={option.code} value={option.code}>
									{option.code} - {option.name}
								</MenuItem>
							))}
						</Select>
					</>
				)}
				{type === EntryType.HealthCheckEntry && (
					<Select
						fullWidth
						value={healthCheckRating}
						onChange={onHealthCheckRatingChange}
						sx={{ marginBottom: 2 }}>
						{healthCheckRatingOptions.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				)}
				{type === EntryType.HospitalEntry && (
					<>
						<InputLabel sx={{ my: 1 }}>Discharge</InputLabel>
						<TextField
							type="date"
							fullWidth
							value={dischargeDate}
							onChange={({ target }) => setDischargDate(target.value)}
							sx={{ marginBottom: 1 }}
						/>
						<TextField
							label="Criteria"
							fullWidth
							value={dischargCriteria}
							onChange={({ target }) => setDischargCriteria(target.value)}
							sx={{ my: 1 }}
						/>
					</>
				)}
				{type === EntryType.OccupationalHealthcareEntry && (
					<>
						<TextField
							label="Employer"
							fullWidth
							value={employerName}
							onChange={({ target }) => setEmployerName(target.value)}
							sx={{ marginTop: 2 }}
						/>
						<InputLabel sx={{ my: 1 }}>Sick leave</InputLabel>
						<InputLabel sx={{ my: 1 }}>Start</InputLabel>
						<TextField
							type="date"
							fullWidth
							value={sickLeaveStart}
							onChange={({ target }) => setSickLeaveStart(target.value)}
						/>
						<InputLabel sx={{ my: 1 }}>End</InputLabel>
						<TextField
							type="date"
							fullWidth
							value={sickLeaveEnd}
							onChange={({ target }) => setSickLeaveEnd(target.value)}
						/>
					</>
				)}

				<Grid sx={{ my: 1 }}>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							style={{ float: 'left' }}
							type="button"
							onClick={onCancel}>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: 'right',
							}}
							type="submit"
							variant="contained">
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddEntryForm;
