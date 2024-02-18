import { useState, useEffect } from 'react';

import { DiaryEntry } from './types';

import { getDiaries } from './services/diaryService';

import Content from './components/Content';
import Form from './components/Form';

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	useEffect(() => {
		getDiaries().then(data => setDiaries(data));
	}, []);
	const updateDiaries = (diary: DiaryEntry) => {
		setDiaries(
			diaries.concat({
				...diary,
			})
		);
	};

	return (
		<>
			<h1>Ikari's Flight Diaries</h1>
			<Form updateDiaries={updateDiaries} />
			<Content diaries={diaries} />
		</>
	);
};

export default App;
