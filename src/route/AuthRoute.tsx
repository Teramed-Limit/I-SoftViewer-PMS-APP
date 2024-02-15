import React from 'react';

import { Navigate } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
}

function AuthRoute({ children }: Props) {
	const isAuthenticated = localStorage.getItem('userInfo');
	return isAuthenticated ? children : <Navigate to="/login" />;
}

export default AuthRoute;
