import { StyleSheet } from '@react-pdf/renderer';

export const globalStyle = StyleSheet.create({
	page: {
		flexDirection: 'column',
		padding: '8px',
		fontFamily: 'Microsoft JhengHei',
	},
	column: {
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
	},
	table: {
		display: 'flex',
		flexDirection: 'column',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#000',
		width: '100%',
		margin: '8px 0',
	},
	tableRow: {
		flexDirection: 'row',
		borderStyle: 'solid',
		borderBottomWidth: 1,
		borderColor: '#000',
		backgroundColor: '#f6f6f6',
	},
	tableCellHeader: {
		padding: '4px',
		flex: 1,
		fontSize: '10px',
	},
	tableCell: {
		padding: '4px',
		flex: 1,
		fontSize: '10px',
	},
});
