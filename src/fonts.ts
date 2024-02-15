import { Font } from '@react-pdf/renderer';

import ArialBold from './assets/fonts/Arial-Bold.ttf';
import Arial from './assets/fonts/Arial.ttf';
import MicrosoftBlack from './assets/fonts/MicrosoftBlack.ttf';
import MicrosoftBlackBold from './assets/fonts/MicrosoftBlackBold.ttf';
import NotoSansTCBold from './assets/fonts/NotoSansTC-Bold.ttf';
import NotoSansTCRegular from './assets/fonts/NotoSansTC-Regular.ttf';
import RobotoBold from './assets/fonts/Roboto-Bold.ttf';
import RobotoRegular from './assets/fonts/Roboto-Regular.ttf';

// Register asynchronous loaded fronts before rendering anything.
export const registerFont = () => {
	// Arial
	Font.register({
		family: 'Arial',
		fonts: [
			{ src: Arial }, // font-style: normal, font-weight: normal
			{ src: ArialBold, fontWeight: 'bold' },
		],
	});
	// Microsoft JhengHei
	Font.register({
		family: 'Microsoft JhengHei',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fonts: [
			{ src: MicrosoftBlack }, // font-style: normal, font-weight: normal
			{ src: MicrosoftBlackBold, fontWeight: 'bold' },
		],
	});
	// Roboto
	Font.register({
		family: 'Roboto',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fonts: [
			{ src: RobotoRegular, fontWeight: 'normal' }, // font-style: normal, font-weight: normal
			{ src: RobotoBold, fontWeight: 'bold' },
		],
	});
	// Noto Sans TC
	Font.register({
		family: 'Noto Sans TC',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fonts: [
			{ src: NotoSansTCRegular, fontWeight: 'normal' }, // font-style: normal, font-weight: normal
			{ src: NotoSansTCBold, fontWeight: 'bold' },
		],
	});
};
