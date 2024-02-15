const modality = [
	{ value: 'X-Ray', label: 'X-Ray' },
	{ value: 'US', label: 'US' },
];

const sex = [
	{ value: 'M', label: 'Male' },
	{ value: 'F', label: 'Female' },
	{ value: 'O', label: 'Other' },
];

const room = [
	{ value: 'Room1', label: 'Room1' },
	{ value: 'Room2', label: 'Room2' },
	{ value: 'Room3', label: 'Room3' },
];

const payerType = [
	{ value: 'referringPhysician', label: 'Referring Physician' },
	{ value: 'unit', label: 'Unit' },
	{ value: 'patient', label: 'Patient' },
];

const paymentMethod = [
	{ value: 'cash', label: 'CASH' },
	{ value: 'creditCard', label: 'Credit Card' },
	{ value: 'cheque', label: 'Cheque' },
	{ value: 'other', label: 'Other' },
];

export const staticOptionType = {
	modality,
	room,
	sex,
	payerType,
	paymentMethod,
};
