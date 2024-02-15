import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

import checkboxChecked from '../../../assets/checkbox-checked.png';
import checkboxUnchecked from '../../../assets/checkbox-unchecked.png';
import { globalStyle } from '../globalStyle.ts';

export const style = StyleSheet.create({
	checkBox: {
		width: 12,
		height: 12,
	},
});

interface Props {
	isChecked: boolean;
	label: string;
}

function CheckBox({ isChecked, label }: Props) {
	return (
		<View style={[globalStyle.row, { paddingLeft: 2, paddingRight: 2 }]}>
			{isChecked ? (
				<Image style={style.checkBox} src={checkboxChecked} />
			) : (
				<Image style={style.checkBox} src={checkboxUnchecked} />
			)}
			<Text style={{ marginLeft: '2px' }}>{label}</Text>
		</View>
	);
}

export default CheckBox;
