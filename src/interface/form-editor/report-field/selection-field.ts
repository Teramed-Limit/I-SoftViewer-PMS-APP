import { FormField } from '../form-editor-define';

export interface OptionSource {
	type: string;
	source: string;
	labelKey: string;
	key: string;
}

export interface FilterCondition {
	filterById: string;
	filterOptionKey: string;
}

export interface SelectionField extends FormField {
	isMulti?: boolean;
	joinStr?: string;
	optionSource: OptionSource;
	filterCondition?: FilterCondition;
	fetchLatest?: boolean;
	valueType?: 'string' | 'number';
}
