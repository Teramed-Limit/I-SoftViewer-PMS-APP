import React from 'react';

import { Autocomplete, Paper, TextField } from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';

import { useSelectOptions } from '../../../../hooks/useSelectOptions';
import { SelectionField } from '../../../../interface/form-editor/report-field/selection-field';

interface Props {
	field: ControllerRenderProps;
	fieldDef: SelectionField;
	error: boolean;
	errorText: string;
}

// 將 PaperComponent 定義在父組件之外以避免重複創建

function AutoCompleteSelect({ field, fieldDef, error, errorText }: Props) {
	const { options } = useSelectOptions(fieldDef.optionSource.type, fieldDef.optionSource.source);

	// const groupOptions = options.map((option) => {
	// 	const firstLetter = option[fieldDef.optionSource.labelKey][0].toUpperCase();
	// 	return {
	// 		firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
	// 		...option,
	// 	};
	// });

	const CustomPaper: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children }) => {
		// 使用 Paper 組件並應用自定義樣式
		return (
			<Paper
				style={{
					width: 'fit-content',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}
			>
				{children}
			</Paper>
		);
	};

	return (
		<Autocomplete
			options={options || []}
			value={options?.find((option) => option[fieldDef.optionSource.key] === field.value) || null}
			onChange={(_, value) => {
				field.onChange(value?.[fieldDef.optionSource.key] || null);
			}}
			// groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => option[fieldDef.optionSource.labelKey] || ''}
			getOptionKey={(option) => option[fieldDef.optionSource.key] || ''}
			renderInput={(params) => (
				<TextField {...params} label={fieldDef.label} error={error} helperText={errorText} />
			)}
			PaperComponent={CustomPaper}
		/>
	);
}

export default AutoCompleteSelect;
