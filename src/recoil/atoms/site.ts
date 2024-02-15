import { atom } from 'recoil';

import { SiteEntity } from '../../interface/site.ts';

export const atomSite = atom<SiteEntity>({
	key: 'site',
	default: undefined,
});
