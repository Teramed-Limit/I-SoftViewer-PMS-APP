import { FormField } from '../form-editor-define';

export interface TextareaField extends FormField {
	placeholder?: string;
	rows?: number;
	maxLength?: number;
}
