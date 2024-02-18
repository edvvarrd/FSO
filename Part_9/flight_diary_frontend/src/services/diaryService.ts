import { NewDiaryEntry, DiaryEntry } from '../types';

import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = async () => {
	const result = await axios
		.get<DiaryEntry[]>(baseUrl)
		.then(response => response.data);
	return result;
};

export const addDiary = async (object: NewDiaryEntry) => {
	const result = await axios
		.post(baseUrl, object)
		.then<DiaryEntry>(response => response.data);
	return result;
};
