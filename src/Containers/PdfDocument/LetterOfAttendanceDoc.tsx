import { Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { RegistrationEntity } from '../../interface/registration.ts';
import EnvService from '../../services/EnvService.ts';
import { convertToDate } from '../../utils/date-utils.ts';
import ClinicShop from './Component/ClinicShop.tsx'; // Create styles
import Header from './Component/Header.tsx';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		padding: '8px',
		fontFamily: 'Microsoft JhengHei',
	},
	body: {
		fontSize: '12px',
		paddingTop: '22px',
		paddingBottom: '80px',
		paddingLeft: '60px',
		paddingRight: '60px',
		flexDirection: 'column',
	},
	section: {
		padding: '10px 0',
	},
	section_assert: {
		padding: '40px 0',
	},
	row_view: {
		flexDirection: 'row',
	},
	clinic_shop_box: {
		border: '1px solid #000',
		width: 120,
		height: 120,
		alignSelf: 'flex-end',
		alignItems: 'center',
		paddingTop: 20,
	},
});

interface Props {
	registration: RegistrationEntity;
}

function LetterOfAttendanceDoc({ registration }: Props) {
	const studyDate = convertToDate(new Date(registration.studyDate), EnvService.getDateFormat());

	return (
		<Page size="A4" style={styles.page}>
			<Header />
			<View style={styles.body}>
				<View style={styles.row_view}>
					<Text style={styles.section}>Name: {registration.patientName}</Text>
					<Text
						style={{
							...styles.section,
							marginLeft: '20',
						}}
					>
						Gender: {registration.patientSex}
					</Text>
				</View>
				<Text style={styles.section}>Date of Exam: {studyDate}</Text>
				<Text style={styles.section}>Exam Number: {registration.examNumber}</Text>
				<Text style={styles.section_assert}>
					This is to certify that the above named patient attend to my radiology practice on {studyDate} for a
					radiological / ultrasound scan study.
				</Text>
				<ClinicShop />
			</View>
		</Page>
	);
}

export default LetterOfAttendanceDoc;
