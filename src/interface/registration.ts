import { RegistrationExamItem } from './exam-item.ts';

export interface RegistrationEntity {
	studyInstanceUID: string;
	patientId: string;
	patientName: string;
	patientCHName: string;
	patientSex: string;
	patientAge: number;
	patientDOB: string;
	contactPhone: string;
	examNumber: string;
	accessionNumber: string;
	studyDate: string;
	modality: string;
	studyDescription: string;
	referringPhysician: string;
	referringPhysicianNumber: string;
	reportingPhysician: string;
	performingPhysician: string;
	fromHA: boolean;
	payerType: string;
	payerId: string;
	paymentUnitName: string;
	paymentMethod: string;
	defaultDiscount: number;
	customDiscount: number;
	createDateTime: string;
	modifiedDateTime: string;
	siteId: string;
	bookId: string;
}

type RegistrationExtend = {
	patientDOB: Date;
	studyDate: Date;
	createDateTime: Date;
	modifiedDateTime: Date;
	examItems: RegistrationExamItem[]; // 檢查項目
	referringLetterAttachment: string[] | File[]; // 轉診信附件
	oldReportAttachment: string[] | File[]; // 舊報告附件
	otherAttachment: string[] | File[]; // 其他附件
	existingReferringLetterAttachment: string[]; // 現有報告
	existingOldReportAttachment: string[]; // 現有報告
	existingOtherAttachment: string[]; // 現有報告
};

type RegistrationEntityOmit = Omit<
	RegistrationEntity,
	'patientDOB' | 'studyDate' | 'createDateTime' | 'modifiedDateTime'
>;
export type RegistrationFormData = RegistrationEntityOmit & RegistrationExtend;
