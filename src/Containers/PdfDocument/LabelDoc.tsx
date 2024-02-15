import { useEffect, useState } from 'react';

import { Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import useHttpRequest from '../../hooks/useHttpRequest.ts'; // Create styles
import { LabelDocumentData } from '../../interface/label-document-data.ts';
import { RegistrationEntity } from '../../interface/registration.ts';
import EnvService from '../../services/EnvService.ts';
import { convertToDate } from '../../utils/date-utils.ts';
import { globalStyle } from './globalStyle.ts';

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Times-Roman',
		flexDirection: 'column',
		padding: '8px',
		fontSize: '12px',
	},
	body: {
		padding: '22px',
		flexDirection: 'column',
		fontSize: '12px',
	},
	doctorSection: {
		border: '2px solid black',
		padding: 6,
	},
	patientSection: {
		marginTop: 6,
		padding: 6,
		border: '1px solid black',
	},
	to: {
		fontFamily: 'Times-BoldItalic',
		fontWeight: 'bold',
		fontSize: '20px',
	},
	payer: {
		fontFamily: 'Times-Bold',
		fontWeight: 'bold',
		fontSize: '16px',
		alignSelf: 'center',
		marginLeft: '20px',
	},
	address: {
		padding: '14px',
		fontSize: '12px',
	},
	titleBold: {
		fontFamily: 'Times-Bold',
		fontSize: '14px',
		alignSelf: 'center',
	},
	titleNormal: {
		fontFamily: 'Times-Roman',
		fontSize: '14px',
		alignSelf: 'center',
	},
	infoBold: {
		padding: '1px',
		fontFamily: 'Times-Bold',
		fontSize: '12px',
		width: 80,
	},
	infoNormal: {
		padding: '1px',
		fontFamily: 'Times-Roman',
		fontSize: '12px',
	},
	jhengHei: {
		fontFamily: 'Microsoft JhengHei',
	},
	jhengHeiBold: {
		fontFamily: 'Microsoft JhengHei',
		fontWeight: 'bold',
	},
	labelSection: {
		flex: '0 0 auto',
	},
	valueSection: {
		flex: 1,
	},
});

interface Props {
	registration: RegistrationEntity;
}

function LabelDoc({ registration }: Props) {
	const [labelDocumentData, setLabelDocumentData] = useState<LabelDocumentData>();

	const { sendRequest } = useHttpRequest<LabelDocumentData>();

	useEffect(() => {
		sendRequest({
			url: `/document/getLabel/studyInstanceUID/${registration.studyInstanceUID}/siteId/${registration.siteId}`,
			method: 'get',
			onSuccess: (data) => {
				setLabelDocumentData(data);
			},
			onError: (_) => {},
			showNotification: false,
		});
	}, [sendRequest, registration]);

	return (
		<Page size="A5" style={styles.page}>
			<View style={styles.body}>
				<View style={styles.doctorSection}>
					<View
						style={[
							globalStyle.row,
							{
								alignItems: 'center',
								justifyContent: 'space-between',
							},
						]}
					>
						<View style={[globalStyle.row]}>
							<Text style={[styles.to]}>To:</Text>
							<Text style={[styles.payer, styles.jhengHeiBold]}>
								{labelDocumentData?.paymentUnit.name}
							</Text>
						</View>
						<Text style={[styles.jhengHeiBold]}>{labelDocumentData?.paymentUnit.otherName}</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Text style={[styles.address, styles.jhengHei]}>{labelDocumentData?.paymentUnit.address}</Text>
					</View>
				</View>
				<View style={styles.patientSection}>
					<View
						style={[
							globalStyle.row,
							{
								justifyContent: 'space-between',
								marginBottom: 12,
							},
						]}
					>
						<Text style={[styles.titleBold]}>Name:</Text>
						<Text style={[styles.titleNormal]}>{registration.patientName}</Text>
						<Text style={[styles.titleNormal, styles.jhengHeiBold]}>{registration.patientCHName}</Text>
						<Text style={[styles.titleNormal]}>{registration.patientSex}</Text>
					</View>
					<View style={[globalStyle.row]}>
						<Text style={[styles.infoBold]}>Exam. No:</Text>
						<Text style={[styles.infoNormal]}>{registration.examNumber}</Text>
					</View>
					<View style={[globalStyle.row]}>
						<Text style={[styles.infoBold]}>Your Ref.No:</Text>
						<Text style={[styles.infoNormal]}>{labelDocumentData?.paymentUnit?.refNo}</Text>
					</View>
					<View style={[globalStyle.row]}>
						<Text style={[styles.infoBold]}>Exam. Date:</Text>
						<Text style={[styles.infoNormal]}>
							{convertToDate(new Date(registration.studyDate), EnvService.getDateFormat())}
						</Text>
					</View>
					{labelDocumentData?.examItems.map((item, index) => {
						return (
							<View key={item.itemId} style={[globalStyle.row]}>
								<Text style={[styles.infoBold, styles.labelSection]}>
									{index === 0 ? 'Examination:' : ''}
								</Text>
								<Text style={[styles.infoNormal, styles.valueSection]}>{item.itemName}</Text>
							</View>
						);
					})}
				</View>
			</View>
		</Page>
	);
}

export default LabelDoc;
