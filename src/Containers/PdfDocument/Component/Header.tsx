import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

import logo from '../../../assets/logo.jpg';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		padding: '8px',
		fontFamily: 'Microsoft JhengHei',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: '2.37cm',
		alignItems: 'center',
	},
	header_logo: {
		width: '8.36cm',
		height: '2.37cm',
	},
	header_address_container: {
		fontSize: '8px',
		color: '#808080',
		fontColor: '#808080',
		flexDirection: 'column',
	},
	header_address: {
		alignSelf: 'flex-end',
	},
});

function Header() {
	return (
		<View style={styles.header}>
			<Image style={styles.header_logo} src={logo} />
			<View style={styles.header_address_container}>
				<Text style={styles.header_address}>
					Room 803-4 8/F Grand Center, 8 Humphreys Avenue, Tsim Sha Tsui
				</Text>
				<Text style={styles.header_address}>尖沙咀堪富利士道8號格蘭中心803-4室</Text>
				<Text style={styles.header_address}>電話Tel: 2780 3111 傳真Fax: 2332 8183</Text>
				<Text style={styles.header_address}>Room 805-6 8/F Hang Shing Building, Nathan Road 363-373</Text>
				<Text style={styles.header_address}>油麻地彌敦道363-373號恆成大廈805-6室</Text>
				<Text style={styles.header_address}>電話Tel: 2780 3166 傳真Fax: 2332 8768</Text>
			</View>
		</View>
	);
}

export default Header;
