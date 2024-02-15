import { FormField } from '../form-editor-define';

export interface TextField extends FormField {
	placeholder?: string;
	suffix?: string;
	prefix?: string;
}
