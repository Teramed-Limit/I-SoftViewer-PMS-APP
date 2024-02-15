import React from 'react';

import { TextField } from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';

import { FormField } from '../../../../interface/form-editor/form-editor-define';

interface Props {
	field: ControllerRenderProps;
	fieldDef: FormField;
	error: boolean;
	errorText: string;
}

function TextEdit({ field, fieldDef, error, errorText }: Props) {
	return (
		<TextField
			{...field}
			label={fieldDef.label}
			error={error}
			helperText={errorText}
			InputProps={{
				readOnly: fieldDef.readOnly,
			}}
		/>
	);
}

export default React.memo(TextEdit);
