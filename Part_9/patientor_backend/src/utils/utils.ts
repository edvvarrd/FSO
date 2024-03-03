export const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

export const isNumber = (number: unknown): number is number => {
	return typeof number === 'number' || number instanceof Number;
};

export const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};
