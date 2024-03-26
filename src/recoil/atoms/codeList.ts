import { atom } from 'recoil';

import { CodeListMap } from '../../interface/code-list.ts';

export const atomCodeList = atom<CodeListMap>({
	key: 'codeListMap',
	default: {},
});
