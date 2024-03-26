import './App.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import InjectAxiosInterceptors from './Components/InjectAxiosInterceptors/InjectAxiosInterceptors .ts';
import MessageAlert from './Components/MessageAlert/MessageAlert';
import Main from './Containers/Main/Main';
import Accounting from './Page/Accounting/Accounting';
import Booking from './Page/Booking/Booking';
import Login from './Page/Login/Login';
import Registration from './Page/Registration/Registration';
import RegistrationEditor from './Page/RegistrationEditor/RegistrationEditor';
import RegistrationQuery from './Page/RegistrationQuery/RegistrationQuery';
import Settings from './Page/Settings/Settings';
import AuthRoute from './route/AuthRoute.tsx';
import RoleRoute from './route/RoleRoute.tsx';
import { darkTheme } from './theme/theme';

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<MessageAlert />
			<BrowserRouter basename="/">
				<InjectAxiosInterceptors />
				<Routes>
					<Route index path="login" element={<Login />} />
					<Route
						path="/"
						element={
							<AuthRoute>
								<Main />
							</AuthRoute>
						}
					>
						<Route index element={<Navigate replace to="/booking" />} />
						<Route path="booking" element={<Booking />} />
						<Route path="registration" element={<Registration />} />
						<Route
							path="registration-editing/studyInstanceUID/:studyInstanceUID"
							element={<RegistrationEditor />}
						/>
						<Route path="study-query" element={<RegistrationQuery />} />
						<Route
							path="accounting"
							element={
								<RoleRoute correspondId="navigation__accounting">
									<Accounting />
								</RoleRoute>
							}
						/>
						<Route
							path="settings"
							element={
								<RoleRoute correspondId="navigation__setting">
									<Settings />
								</RoleRoute>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
