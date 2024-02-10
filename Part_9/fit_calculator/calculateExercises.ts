interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (exercises: number[], target: number): Result => {
	const periodLength = exercises.length;

	const trainingDaysArray = [];
	for (const i of exercises) {
		if (Number(exercises[i]) > 0) {
			trainingDaysArray.push(exercises[i]);
		}
	}

	const trainingDays = trainingDaysArray.length;

	const dailyAverage = exercises.reduce((a, b) => a + b) / periodLength;

	const success = dailyAverage >= target ? true : false;

	const calculateRating = (dailyAverage: number, target: number): number => {
		const targetMet = dailyAverage / target;
		if (targetMet < 0.8) {
			return 1;
		} else if (targetMet >= 0.8) {
			return 2;
		} else if (targetMet < 1) {
			return 3;
		} else {
			return 0;
		}
	};

	const rating = calculateRating(dailyAverage, target);

	const explainRating = (rating: number): string => {
		switch (rating) {
			case 1:
				return 'Well, you probably need better motivation...';
			case 2:
				return 'You almost did it, good luck next time!';
			case 3:
				return 'You did very well, good job!';
			default:
				return 'Invalid value...';
		}
	};

	const ratingDescription = explainRating(rating);

	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: dailyAverage,
	};
};

export default calculateExercises;
