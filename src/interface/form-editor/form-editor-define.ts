import { RegisterOptions } from 'react-hook-form';

export interface FormEditorDef {
	direction: 'row' | 'column';
	eachFieldWidth?: string;
	sections: FormSection[];
}

export interface FormSection {
	id: string;
	label: string;
	direction: 'row' | 'column';
	flex: string;
	fieldWidth: string;
	fields: FormField[];
}

export interface FormField {
	id: string;
	label: string;
	type: string;
	validate?: RegisterOptions;
	isKey?: boolean;
	readOnly?: boolean;
	hide?: boolean;
	dependentFieldId?: string;
	calculateMethod?: string;
}

export enum FormFieldEditorType {
	Text = 'Text',
	TextArea = 'TextArea',
	Number = 'Number',
	Checkbox = 'Checkbox',
	SingleSelect = 'SingleSelect',
	AutoCompleteSelect = 'AutoCompleteSelect',
	AutoCompleteText = 'AutoCompleteText',
	MultiSelect = 'MultiSelect',
	DateTime = 'DateTime',
	Date = 'Date',
}
