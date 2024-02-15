import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { RefreshToken } from '../../interface/refreshToken.ts';
import EnvService from '../../services/EnvService.ts';
import { instance } from '../../utils/api/api.ts';

function InjectAxiosInterceptors() {
	const navigate = useNavigate();

	if (!instance) return null;

	const onRefreshToken = async () => {
		try {
			const userInfoJson = localStorage.getItem('userInfo');
			if (!userInfoJson) return false;
			const userInfo = JSON.parse(userInfoJson) as UserInfo;

			const tempAxois = axios.create({ baseURL: EnvService.getIpAddress() });
			const response = await tempAxois.post<RefreshToken>('/auth/refreshToken', {
				refreshToken: userInfo.refreshToken,
				userId: userInfo.userId,
			});
			const { accessToken, refreshToken } = response?.data as RefreshToken;
			userInfo.accessToken = accessToken;
			userInfo.refreshToken = refreshToken;
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
			return true;
		} catch (error) {
			return false;
		}
	};

	// 設置axios的請求攔截器，攔截每次請求，加上Token
	instance.interceptors.request.use(
		(config) => {
			const userInfoJson = localStorage.getItem('userInfo');
			if (!userInfoJson) return config;
			const userInfo = JSON.parse(userInfoJson) as UserInfo;

			if (userInfo.accessToken) {
				// eslint-disable-next-line no-param-reassign
				config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
			}
			return config;
		},
		(error) => Promise.reject(error),
	);
	// 設置axios的響應攔截器，處理Token過期
	instance.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			// 如果響應狀態碼為401，嘗試刷新Token
			// eslint-disable-next-line no-underscore-dangle
			if (error.response.status === 401 && !originalRequest._retry) {
				// eslint-disable-next-line no-underscore-dangle
				originalRequest._retry = true;
				const success = await onRefreshToken();
				if (success) {
					return instance ? instance(originalRequest) : Promise.reject(error);
				}
				navigate('/login');
			}
			return Promise.reject(error);
		},
	);
	return null;
}

export default InjectAxiosInterceptors;
