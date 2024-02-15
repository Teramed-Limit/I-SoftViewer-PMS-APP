import * as R from 'ramda';

export const coerceArray = (ary: string | any[]) => {
	if (Array.isArray(ary)) {
		return ary;
	}
	return [ary];
};

export const trim = (str: string) => str.replace(/^\s+|\s+$/gm, '');

export const isEmptyOrNil = (value: any) => {
	return R.isEmpty(value) || R.isNil(value);
};

export const generateUUID = () => {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

// Define a function to convert date of birth to age in years, accurate to the date
export function dobToAge(dob: Date) {
	// Parse the date of birth input string to a Date object
	const birthDate = new Date(dob);
	// Get the current date
	const currentDate = new Date();
	// Calculate the difference in years between the current date and the date of birth
	let age = currentDate.getFullYear() - birthDate.getFullYear();
	// Get the current month and the birth month
	const currentMonth = currentDate.getMonth();
	const birthMonth = birthDate.getMonth();
	// Check if the current month is before the birth month or if it's the same month but the day is before the birth day
	if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
		// Subtract one year from the age if the birthday hasn't occurred yet this year
		age--;
	}
	// Return the calculated age
	return age;
}
