import React from 'react';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ControllerRenderProps } from 'react-hook-form';

import { FormField } from '../../../../interface/form-editor/form-editor-define';
import EnvService from '../../../../services/EnvService.ts';

interface Props {
	field: ControllerRenderProps;
	fieldDef: FormField;
	error: boolean;
	errorText: string;
}

function DateEdit({ field, fieldDef, error, errorText }: Props) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				{...field}
				value={field.value || null}
				defaultValue={new Date()}
				label={fieldDef.label}
				format={EnvService.getDateFormat()}
				slotProps={{
					textField: {
						helperText: errorText,
						error,
					},
				}}
			/>
		</LocalizationProvider>
	);
}

export default React.memo(DateEdit);
