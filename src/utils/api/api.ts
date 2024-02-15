import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { from } from 'rxjs';

import { Environment } from '../../interface/environment';
import EnvService from '../../services/EnvService';

// eslint-disable-next-line import/no-mutable-exports
export let instance: AxiosInstance | null = null;

export const fetchAppConfig = async (): Promise<void> => {
	try {
		const response = await axios.get('/config.json');
		const environment: Environment = response.data;

		EnvService.setIpAddress(environment.ip_address);
		EnvService.setDateFormat(environment.date_format);
		EnvService.setDateTimeFormat(environment.datetime_format);
		EnvService.setERSUrl(environment.ers_app);

		if (!environment) {
			instance = axios;
		} else {
			instance = axios.create({ baseURL: environment.ip_address });
		}
	} catch (error) {
		console.error('Error fetching config:', error);
		instance = axios;
	}
};

const request = async <T, D = any>(method: string, url: string, data?: D) => {
	if (!instance) {
		throw new Error('Instance not created yet');
	}

	// 如果method是get，那data就是params
	const response: AxiosResponse<T> = await instance({
		method,
		url,
		data,
		params: method === 'get' ? data : undefined,
	});

	return response.data;
};

export const get = <T = any, D = any>(url: string, params?: D) => request<T, D>('get', url, params);

export const post = <T = any, D = any>(url: string, data?: D) => request<T, D>('post', url, data);

export const put = <T = any, D = any>(url: string, data?: D) => request<T, D>('put', url, data);

export const del = <T = any, D = any>(url: string, data?: D) => request<T, D>('delete', url, data);

export const http = {
	get: <T = any, D = any>(url: string, data?: D) => from(request<T, D>('get', url, data)),
	post: <T = any, D = any>(url: string, data?: D) => from(request<T, D>('post', url, data)),
	put: <T = any, D = any>(url: string, data?: D) => from(request<T, D>('put', url, data)),
	del: <T = any, D = any>(url: string, data?: D) => from(request<T, D>('delete', url, data)),
};
