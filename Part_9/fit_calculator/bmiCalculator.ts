import { parseValues } from './utils';
import calculateBmi from './calculateBmi';

interface calculateValues {
	value1: number;
	value2: number;
}

const parseArguments = (args: string[]): calculateValues => {
	if (args.length > 4) throw new Error('Too many arguments');

	const values = parseValues(args);

	return {
		value1: values[0],
		value2: values[1],
	};
};

try {
	const { value1, value2 } = parseArguments(process.argv);
	console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
	let errorMessage = 'Something went wrong';
	if (error instanceof Error) {
		errorMessage += ` Error: ${error.message}`;
	}
	console.log(errorMessage);
}
