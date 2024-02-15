import { useEffect, useState } from 'react';

import { Observable, of } from 'rxjs';

import { staticOptionType } from '../constant/static-options';
import { http } from '../utils/api/api';

export interface OptionRetriever {
	retrieve: (source) => Observable<any[]>;
}

const OptionRetrieverMapper: { [props: string]: OptionRetriever } = {
	http: {
		retrieve: (source) => http.get<any>(`codeList/codeName/${source}`),
	},
	customHttp: {
		retrieve: (source) => http.get<any>(`${source}`),
	},
	static: {
		retrieve: (source) => of(staticOptionType[source]),
	},
};

export const useSelectOptions = (type: string, source: string) => {
	const [options, setOptions] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		const optionRetriever = OptionRetrieverMapper[type];
		const subscription = optionRetriever.retrieve(source).subscribe({
			next: (data) => {
				setOptions(data);
				setLoading(false);
			},
			error: (error) => {
				console.error(error);
				setLoading(false);
			},
		});
		return () => subscription.unsubscribe();
	}, [source, type]);

	return { options, loading };
};
