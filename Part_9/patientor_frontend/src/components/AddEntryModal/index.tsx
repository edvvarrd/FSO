import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddEntryForm from './AddEntryForm';

import { NewEntry, Diagnosis } from '../../types';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: NewEntry) => void;
	modalError?: string;
	diagnoses: Diagnosis[];
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose, modalError, diagnoses }: Props) => (
	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Add a new entry</DialogTitle>
		<Divider />
		<DialogContent>
			{modalError && (
				<Alert severity="error" sx={{ marginBottom: 2 }}>
					{modalError}
				</Alert>
			)}
			<AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
		</DialogContent>
	</Dialog>
);

export default AddEntryModal;
