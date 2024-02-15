import { useCallback } from 'react';

export const useRoleFunctionAvailable = () => {
	const checkAvailable = useCallback((compareId: string): boolean => {
		const json = localStorage.getItem('userInfo');
		const userInfo = json ? (JSON.parse(json) as UserInfo) : undefined;
		const functionList = userInfo?.functionList || [];

		return !!functionList.find((roleFunction) => {
			return compareId && compareId === roleFunction.correspondElementId;
		});
	}, []);

	return { checkAvailable };
};
