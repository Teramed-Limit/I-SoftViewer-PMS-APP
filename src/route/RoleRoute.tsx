import React from 'react';

import { Navigate } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
	correspondId: string;
}

function RoleRoute({ correspondId, children }: Props) {
	const json = localStorage.getItem('userInfo');
	const userInfo = json ? (JSON.parse(json) as UserInfo) : undefined;

	if (!userInfo) {
		return <Navigate to="/login" />;
	}

	const found = userInfo?.functionList.find((roleFunction) => roleFunction.correspondElementId === correspondId);

	return found ? children : <Navigate to="/" />;
}

export default RoleRoute;
