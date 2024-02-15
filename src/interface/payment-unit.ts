import { PayerEntity } from './payer.ts';

export interface PaymentUnitEntity {
	paymentType: string;
	name: string;
	otherName: string;
	refNo: string | null;
	address: string;
	contact: string;
}

export interface PaymentUnitWithPayer {
	paymentType: string;
	name: string;
	otherName: string;
	refNo: string | null;
	address: string;
	contact: string;
	payers: PayerEntity[];
}
