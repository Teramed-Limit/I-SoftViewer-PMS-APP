export interface BookingEntity {
	bookId: string;
	patientId: string;
	patientName: string;
	patientCHName: string;
	patientSex: string;
	modality: string;
	contactPhone: string;
	referringPhysician: string;
	startDatetime: Date;
	endDatetime: Date;
	siteId: string;
	isRegister: boolean;
	remark: string;
}
