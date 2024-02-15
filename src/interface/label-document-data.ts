import { ExamItemEntity } from './exam-item.ts';
import { PayerEntity } from './payer.ts';
import { PaymentUnitEntity } from './payment-unit.ts';

export interface LabelDocumentData {
	examItems: ExamItemEntity[];
	payer: PayerEntity;
	paymentUnit: PaymentUnitEntity;
}
