export const parseValues = (args: string[]): number[] => {
	if (args.length < 4) {
		throw new Error('Not enough arguments');
	}
	const values: number[] = [];
	for (const i of args) {
		if (Number(i) > 1) {
			if (isNaN(Number(i))) {
				throw new Error('All arguments must be numbers');
			}
			values.push(Number(i));
		}
	}
	console.log(values);
	return values;
};
