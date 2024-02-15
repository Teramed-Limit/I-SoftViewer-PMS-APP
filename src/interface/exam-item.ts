export interface ExamItemEntity {
	itemId: string;
	itemName: string;
	number: number;
	modality: string;
	price: number;
	siteId: string;
}

// export interface RegistrationExamItemEntity extends RegistrationExamItem {
// 	studyInstanceUID: string;
// }

export interface RegistrationExamItem {
	itemId: string;
	itemName: string;
	number: number;
	price: number;
}
