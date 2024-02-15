import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	clinic_shop_box: {
		border: '1px solid #000',
		width: 120,
		height: 120,
		alignSelf: 'flex-end',
		alignItems: 'center',
		paddingTop: 20,
	},
});

function ClinicShop() {
	return (
		<View style={styles.clinic_shop_box}>
			<Text>Clinic Shop</Text>
		</View>
	);
}

export default ClinicShop;
