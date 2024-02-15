import { useEffect, useState } from 'react';

import { Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import useHttpRequest from '../../hooks/useHttpRequest.ts'; // Create styles
import { RegistrationExamItem } from '../../interface/exam-item.ts';
import { LabelDocumentData } from '../../interface/label-document-data.ts';
import { RegistrationEntity } from '../../interface/registration.ts';
import CheckBox from './Component/CheckBox.tsx';
import ClinicShop from './Component/ClinicShop.tsx';
import Header from './Component/Header.tsx';
import { globalStyle } from './globalStyle.ts';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		padding: '8px',
		fontFamily: 'Microsoft JhengHei',
		lineHeight: '1.4',
	},
	body: {
		padding: '22px',
		flexDirection: 'column',
		fontFamily: 'Arial',
		fontSize: '12px',
	},
	title: {
		alignItems: 'center',
		fontSize: '16px',
		marginBottom: '8px',
	},
});

interface Props {
	registration: RegistrationEntity;
}

const gridDefine = [
	{
		field: 'itemName',
		headerName: 'Exam Items',
		flex: 1,
		width: 120,
	},
	{
		field: 'price',
		headerName: 'Unit Price',
		flex: 1,
		valueSetter: (_: RegistrationEntity, data: RegistrationExamItem) => {
			return data.price.toLocaleString('en-US');
		},
	},
	// {
	// 	field: 'number',
	// 	headerName: 'Num.',
	// 	flex: 1,
	// },
	// {
	// 	field: 'totalPrice',
	// 	headerName: 'Amount',
	// 	flex: 1,
	// 	valueSetter: (_: Registration, data: ExamItem) => {
	// 		return (data.price * data.number).toLocaleString('en-US');
	// 	},
	// },
	{
		field: 'discount',
		headerName: 'Dis.',
		flex: 1,
		valueSetter: (context: RegistrationEntity, _: RegistrationExamItem) => {
			return context.customDiscount === 0 ? context.defaultDiscount : `${context.customDiscount}`;
		},
	},
	{
		field: 'discountPrice',
		headerName: 'Net Amount',
		flex: 1,
		valueSetter: (context: RegistrationEntity, data: RegistrationExamItem) => {
			const totalPrice = data.price * data.number;
			const usingDiscount = context.customDiscount !== 0 ? context.customDiscount || 1 : context.defaultDiscount;
			return (totalPrice * usingDiscount).toLocaleString('en-US');
		},
	},
];

function ReceiptDoc({ registration }: Props) {
	const [receiptDocumentData, setReceiptDocumentData] = useState<LabelDocumentData>();
	const studyDate = new Date(registration.studyDate).toDateString();
	const today = new Date().toDateString();

	const { sendRequest } = useHttpRequest<LabelDocumentData>();

	useEffect(() => {
		sendRequest({
			url: `/document/getReceipt/studyInstanceUID/${registration.studyInstanceUID}/siteId/${registration.siteId}`,
			method: 'get',
			onSuccess: (data) => {
				setReceiptDocumentData(data);
			},
			showNotification: false,
		});
	}, [sendRequest, registration]);

	let totalNetPrice = receiptDocumentData?.examItems.reduce((total, item) => total + item.number * item.price, 0);
	// 計算折扣後的總價
	const usingDiscount =
		registration?.customDiscount !== 0 ? registration.customDiscount || 1 : registration.defaultDiscount;
	totalNetPrice = totalNetPrice ? totalNetPrice * usingDiscount : 0;

	return (
		<Page size="A4" style={styles.page}>
			<Header />
			<View style={styles.body}>
				<View style={styles.title}>
					<Text>RECEIPT</Text>
				</View>
				<View style={{ alignItems: 'flex-end' }}>
					<Text>Date: {today}</Text>
					<Text>Exam Number: {registration.examNumber}</Text>
				</View>
				<Text>Name: {registration.patientName}</Text>
				<Text>Date of Exam: {studyDate}</Text>
				<View style={globalStyle.table}>
					<View style={globalStyle.tableRow}>
						{gridDefine.map((item) => {
							return (
								<Text
									key={item.field}
									style={[
										globalStyle.tableCellHeader,
										{
											flex: item.flex,
											minWidth: item.width,
										},
									]}
								>
									{item.headerName}
								</Text>
							);
						})}
					</View>
					{receiptDocumentData?.examItems.map((item) => {
						return (
							<View key={item.itemId} style={globalStyle.tableRow}>
								{gridDefine.map((gridItem) => {
									let value = item[gridItem.field];
									if (gridItem.valueSetter) {
										value = gridItem.valueSetter(registration, item);
									}
									return (
										<Text
											key={gridItem.field}
											style={[
												globalStyle.tableCell,
												{ flex: gridItem.flex, minWidth: gridItem.width },
											]}
										>
											{value}
										</Text>
									);
								})}
							</View>
						);
					})}
				</View>
				<View style={{ alignItems: 'flex-end', margin: '12px 0' }}>
					<Text style={{ textDecoration: 'underline' }}>
						Total Amount HKD$ {totalNetPrice.toLocaleString('en-US')}
					</Text>
				</View>
				<View style={{ margin: '24x 0' }}>
					<Text>Received by: SONO EXPRESS LIMITED</Text>
				</View>
				<View style={[globalStyle.row]}>
					<Text>Payment Method:</Text>
					<CheckBox isChecked={registration?.paymentMethod === 'cash'} label="Cash" />
					<CheckBox isChecked={registration?.paymentMethod === 'creditCard'} label="Credit Card" />
					<CheckBox isChecked={registration?.paymentMethod === 'chequePayment'} label="Cheque" />
					<CheckBox isChecked={registration?.paymentMethod === 'other'} label="Other" />
				</View>
				<View style={[globalStyle.row]}>
					<Text>Credit Card Number:</Text>
					<Text style={{ marginLeft: 32 }}>Exp.</Text>
					<Text style={{ margin: '0 32px' }}>/</Text>
					<Text>Sec. Code:</Text>
				</View>
				<View />
				<View>
					<Text>Cheque Number:</Text>
				</View>
				<View style={{ marginTop: 60 }}>
					<ClinicShop />
				</View>
			</View>
		</Page>
	);
}

export default ReceiptDoc;
