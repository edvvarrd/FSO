import { useState, useEffect } from 'react';

import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

import { getDiaries } from './services/diaryService';

import Header from './components/Header';
import Content from './components/Content';
import Form from './components/Form';

const App = () => {
	const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
	useEffect(() => {
		getDiaries().then(data => setDiaries(data));
	}, []);

	const updateDiaries = (diary: NewDiaryEntry) => {
		setDiaries(
			diaries.concat({
				id: diaries.length + 1,
				...diary,
			} as NonSensitiveDiaryEntry)
		);
	};

	return (
		<>
			<Header title="Ikari's Flight Diaries" />
			<Form updateDiaries={updateDiaries} />
			<Content diaries={diaries} />
		</>
	);
};

export default App;
