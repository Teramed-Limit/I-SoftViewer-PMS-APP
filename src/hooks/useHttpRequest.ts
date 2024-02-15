import { useCallback, useState } from 'react'; // 定義hook參數和回傳值的類型，使用泛型T來標示回傳結果的類型

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { MessageType } from '../interface/notification';
import { atomNotification } from '../recoil/atoms/notification';
import { http } from '../utils/api/api';

// 定義hook參數和回傳值的類型，使用泛型T來標示回傳結果的類型
type RequestConfig<T> = {
	url: string;
	method: 'get' | 'post' | 'del' | 'put';
	body?: any;
	onSuccess: (result: T) => void; // 使用泛型T作為onSuccess回調函數的參數類型
	onError?: (error: AxiosError<string>) => void;
	showNotification?: boolean;
	notificationMessage?: string;
};

// 泛型HTTP請求hook
function useHttpRequest<T>() {
	const setNotification = useSetRecoilState(atomNotification);
	const [isLoading, setIsLoading] = useState(true);

	// 發送請求的函數，接受一個配置對象作為參數
	const sendRequest = useCallback(
		({
			url,
			method,
			body = null,
			onSuccess,
			onError,
			showNotification = true,
			notificationMessage,
		}: RequestConfig<T>) => {
			setIsLoading(true); // 設置isLoading狀態為true
			const subscription = http[method](url, body).subscribe({
				next: (result: T) => {
					onSuccess(result); // 調用onSuccess回調，並傳入結果
					setIsLoading(false); // 設置isLoading狀態為false
					if (!showNotification) return;
					setNotification({
						messageType: MessageType.Success,
						message: notificationMessage || 'Operation Success', // 將消息文本改為更通用的表述
					});
				},
				error: (err: AxiosError<string>) => {
					console.error(err);
					onError?.(err); // 調用onError回調，傳入錯誤消息
					setIsLoading(false); // 設置isLoading狀態為false
					setNotification({
						messageType: MessageType.Error,
						message: err.response?.data || 'Operation Failed', // 使用錯誤響應中的消息，或提供默認錯誤消息
					});
				},
			});

			return () => subscription.unsubscribe();
		},
		[setNotification],
	);

	return { sendRequest, isLoading };
}

export default useHttpRequest;
