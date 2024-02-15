import React from 'react';

import HistoryIcon from '@mui/icons-material/History';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import useHttpRequest from '../../../../hooks/useHttpRequest.ts';
import { AutoCompleteTextField } from '../../../../interface/form-editor/report-field/auto-complete-text-field.ts';
import { MessageType } from '../../../../interface/notification.ts';
import { atomNotification } from '../../../../recoil/atoms/notification.ts';
import { isEmptyOrNil } from '../../../../utils/general.ts';

interface Props {
	field: ControllerRenderProps;
	fieldDef: AutoCompleteTextField;
	error: boolean;
	errorText: string;
}

function AutoCompleteText({ field, fieldDef, error, errorText }: Props) {
	const setNotification = useSetRecoilState(atomNotification);
	const { sendRequest } = useHttpRequest<any>();
	const { setValue, watch } = useFormContext(); // 從 context 中獲取 setValue
	const fieldValue = watch(fieldDef.id);

	const autoComplete = () => {
		if (!fieldValue) return;
		// 根據依賴欄位值自動填充當前欄位的邏輯
		sendRequest({
			url: fieldDef.url, // API路徑
			method: 'get', // 請求方法
			body: {
				key: fieldDef.id,
				value: fieldValue,
			},
			showNotification: false,
			onSuccess: (data) => {
				if (isEmptyOrNil(data)) {
					setNotification({
						message: 'There is no data to fill in.',
						messageType: MessageType.Warning,
					});
					return;
				}
				// 根據自動填充的欄位設定值
				Object.keys(fieldDef.autoCompleteFields).forEach((key) => {
					// 型別拿出來
					const valueOfType = fieldDef.autoCompleteFields[key];
					// 如果是date型別，需要轉換
					if (valueOfType === 'date') {
						setValue(key, new Date(data[key]));
					}
					// 如果是number型別，需要轉換
					else if (valueOfType === 'number') {
						setValue(key, Number(data[key]));
					}
					// 其他型別直接設定
					else {
						setValue(key, data[key]);
					}
				});
			},
		});
	};

	return (
		<TextField
			fullWidth
			{...field}
			label={fieldDef.label}
			error={error}
			helperText={errorText}
			// Integrates the icon button inside the text field as an end adornment
			InputProps={{
				readOnly: fieldDef.readOnly,
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							sx={{ width: '20px', height: '20px' }}
							size="small"
							color="primary"
							onClick={() => autoComplete()}
						>
							<HistoryIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}

export default React.memo(AutoCompleteText);
