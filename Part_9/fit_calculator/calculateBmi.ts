const calculateBmi = (height: number, weight: number): string => {
	const heightInMeters = height / 100;
	const heightSquare = heightInMeters ** 2;
	const BMI = Math.floor(weight / heightSquare);

	if (BMI < 18.5) {
		return 'underweight';
	} else if (BMI < 24.9) {
		return 'healthy weight';
	} else {
		return 'overweight';
	}
};

export default calculateBmi;
