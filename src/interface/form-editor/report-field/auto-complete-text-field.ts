import { FormField } from '../form-editor-define';

export interface AutoCompleteTextField extends FormField {
	url: string;
	autoCompleteFields: AutocompleteList;
}

export interface AutocompleteList {
	[key: string]: string;
}
