import { parseValues } from './utils';
import calculateExercises from './calculateExercises';

try {
	const values = parseValues(process.argv);
	const target = values[0];
	const exercises = values.slice(1);

	console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
	let errorMessage = 'Something went wrong';

	if (error instanceof Error) {
		errorMessage += `- Error: ${error.message}`;
	}

	console.log(errorMessage);
}
