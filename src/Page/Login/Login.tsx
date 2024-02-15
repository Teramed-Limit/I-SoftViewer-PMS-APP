import { FormEvent, useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import loginBackground from '../../assets/login_bg.png';
import useHttpRequest from '../../hooks/useHttpRequest.ts';
import { atomAuth } from '../../recoil/atoms/auth.ts';
import classes from './Login.module.scss';

function Login() {
	const setIsAuthenticated = useSetRecoilState(atomAuth);
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const { sendRequest } = useHttpRequest<UserInfo>();

	// 處理登錄功能

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		sendRequest({
			url: `/auth/login`,
			method: 'post',
			body: { userId, password },
			notificationMessage: 'Welcome Back!',
			onSuccess: (data) => {
				setIsAuthenticated(true);
				localStorage.setItem('userInfo', JSON.stringify(data));
				navigate(`/`);
			},
			onError: (_) => {},
		});
	};

	return (
		<Container component="main" sx={{ display: 'flex', padding: '80px', height: '100vh' }}>
			<Paper className={classes.bgPaper} elevation={3}>
				<span className={classes.imageContainer}>
					<img src={loginBackground} alt="" />
				</span>
				<Box className={classes.loginForm}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography className={classes.title} component="h1" variant="h5">
						Hi, Welcome Back
					</Typography>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="userId"
							label="User"
							name="userId"
							autoFocus
							autoComplete="off"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="off"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button size="large" type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
							Sign In
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
}

export default Login;
