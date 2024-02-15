import React, { useEffect } from 'react';

import { MenuItem, MenuProps, TextField } from '@mui/material';
import { BaseTextFieldProps } from '@mui/material/TextField/TextField';
import { ControllerRenderProps } from 'react-hook-form';

import { useSelectOptions } from '../../../../hooks/useSelectOptions';
import { SelectionField } from '../../../../interface/form-editor/report-field/selection-field';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const menuProps: Partial<MenuProps> = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
	transitionDuration: 0,
};

interface Props {
	field: ControllerRenderProps;
	baseTextFieldProps?: BaseTextFieldProps;
	fieldDef: SelectionField;
	error: boolean;
	autoSelectWhenOnlyOneOption?: boolean;
	errorText: string;
	variant?: 'standard' | 'outlined' | 'filled';
	onGetSelectedOptions?: (option: any) => void;
}

function SingleSelect({
	field,
	baseTextFieldProps,
	fieldDef,
	error,
	errorText,
	variant = 'outlined',
	autoSelectWhenOnlyOneOption = false,
	onGetSelectedOptions,
}: Props) {
	const { options } = useSelectOptions(fieldDef.optionSource.type, fieldDef.optionSource.source);

	useEffect(() => {
		// 如果只有一個選項，則自動選擇
		if (options.length === 1 && autoSelectWhenOnlyOneOption) {
			field.onChange(options[0][fieldDef.optionSource.key]);
			onGetSelectedOptions?.(options[0]);
		}
	}, [field, fieldDef.optionSource.key, autoSelectWhenOnlyOneOption, onGetSelectedOptions, options]);

	const foundOption = options.find((x) => x[fieldDef.optionSource.key] === field.value);

	return (
		<>
			<TextField
				{...field}
				{...baseTextFieldProps}
				onChange={(e) => {
					field.onChange(e);
					const selectedOption = options.find(
						(option) => option[fieldDef.optionSource.key] === e.target.value,
					);
					onGetSelectedOptions?.(selectedOption);
				}}
				value={foundOption ? field.value : ''}
				variant={variant}
				label={fieldDef.label}
				select
				error={error}
				helperText={errorText}
				SelectProps={{ MenuProps: menuProps }}
				InputProps={{
					readOnly: fieldDef.readOnly,
				}}
			>
				<MenuItem value="">
					<em>- None -</em>
				</MenuItem>
				{options?.map((item) => {
					const optionLabel = fieldDef.optionSource.labelKey ? item[fieldDef.optionSource.labelKey] : item;
					const optionKey = fieldDef.optionSource.key ? item[fieldDef.optionSource.key] : item;
					return (
						<MenuItem key={optionKey} value={optionKey}>
							{optionLabel}
						</MenuItem>
					);
				})}
			</TextField>
		</>
	);
}

export default React.memo(SingleSelect);
