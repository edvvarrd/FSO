import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = async () => {
	const result = await axios
		.get<NonSensitiveDiaryEntry[]>(baseUrl)
		.then(response => response.data);
	return result;
};

export const addDiary = async (object: NewDiaryEntry) => {
	const result = await axios
		.post<object>(baseUrl, object)
		.then(response => response.data);
	return result;
};
