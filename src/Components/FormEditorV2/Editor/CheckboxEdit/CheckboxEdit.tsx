import { FormControl, FormHelperText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ControllerRenderProps } from 'react-hook-form';

import { FormField } from '../../../../interface/form-editor/form-editor-define.ts';

interface Props {
	field: ControllerRenderProps;
	fieldDef: FormField;
	error: boolean;
	errorText: string;
}

function CheckboxEdit({ field, fieldDef, error, errorText }: Props) {
	return (
		<FormControl error={error}>
			{/* FormControl wraps FormControlLabel to control the layout and validation error message */}
			<FormControlLabel
				control={
					// Checkbox input with properties passed from parent
					<Checkbox {...field} size="small" readOnly={fieldDef.readOnly} />
				}
				label={fieldDef.label || ''}
			/>
			{/* FormHelperText to display error message, shown only if error exists */}
			{error && <FormHelperText>{errorText}</FormHelperText>}
		</FormControl>
	);
}

export default CheckboxEdit;
