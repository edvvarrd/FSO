import { useState } from 'react';

import { addDiary } from '../services/diaryService';

import axios from 'axios';

import { isString } from '../utils';
import { NewDiaryEntry } from '../types';

const Form = ({
	updateDiaries,
}: {
	updateDiaries: (diary: NewDiaryEntry) => void;
}) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');
	const [error, setError] = useState('');

	const submit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const newDiaryEntry = {
			date,
			visibility,
			weather,
			comment,
		};
		if (
			newDiaryEntry.date === '' ||
			newDiaryEntry.visibility === '' ||
			newDiaryEntry.weather === ''
		) {
			return setError('Some fields are missing!');
		}
		addDiary(newDiaryEntry as NewDiaryEntry)
			.then(data => {
				updateDiaries(data as NewDiaryEntry);
				setError('');
			})
			.catch(error => {
				if (axios.isAxiosError(error) && isString(error.response?.data)) {
					setError(error.response?.data);
				} else {
					setError('Something went wrong while adding new diary');
				}
			});
		setDate('');
		setVisibility('');
		setWeather('');
		setComment('');
	};

	return (
		<>
			<h2>Add new entry</h2>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<form onSubmit={submit}>
				<div>
					<label htmlFor="date">
						Date:
						<input
							name="date"
							type="date"
							value={date}
							onChange={event => setDate(event.target.value)}
						/>
					</label>
				</div>
				<div>
					<label htmlFor="visibility">
						Visibility:
						<input
							type="radio"
							name="visibility"
							value="great"
							onChange={event => setVisibility(event.target.value)}
						/>{' '}
						great
						<input
							type="radio"
							name="visibility"
							value="ok"
							onChange={event => setVisibility(event.target.value)}
						/>{' '}
						ok
						<input
							type="radio"
							name="visibility"
							value="good"
							onChange={event => setVisibility(event.target.value)}
						/>{' '}
						good
						<input
							type="radio"
							name="visibility"
							value="poor"
							onChange={event => setVisibility(event.target.value)}
						/>{' '}
						poor
					</label>
				</div>
				<div>
					<label htmlFor="weather">
						Weather:
						<input
							type="radio"
							name="weather"
							value="sunny"
							onChange={event => setWeather(event.target.value)}
						/>{' '}
						sunny
						<input
							type="radio"
							name="weather"
							value="rainy"
							onChange={event => setWeather(event.target.value)}
						/>{' '}
						rainy
						<input
							type="radio"
							name="weather"
							value="cloudy"
							onChange={event => setWeather(event.target.value)}
						/>{' '}
						cloudy
						<input
							type="radio"
							name="weather"
							value="stormy"
							onChange={event => setWeather(event.target.value)}
						/>{' '}
						stormy
						<input
							type="radio"
							name="weather"
							value="windy"
							onChange={event => setWeather(event.target.value)}
						/>{' '}
						windy
					</label>
				</div>
				<div>
					<label htmlFor="comment">
						Comment:
						<input
							name="comment"
							type="text"
							value={comment}
							onChange={event => setComment(event.target.value)}
						/>
					</label>
				</div>
				<button type="submit">add</button>
			</form>
		</>
	);
};

export default Form;
