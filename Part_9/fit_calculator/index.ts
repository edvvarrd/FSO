import express from 'express';
const app = express();

app.use(express.json());

import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { weight, height } = req.query;

	if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
		const bmi = calculateBmi(Number(height), Number(weight));
		res.json({ weight: weight, height: height, bmi: bmi });
	} else {
		res.status(400).json({ error: 'malformatted parameters' });
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		res.status(400).json({ error: 'parameters missing' });
	}

	for (const i of daily_exercises) {
		if (isNaN(Number(i))) {
			return;
		}
	}

	if (isNaN(Number(target))) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateExercises(daily_exercises, target);

	res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`server is running on a port ${PORT}`);
});
