import { FormFieldEditorType } from '../../../interface/form-editor/form-editor-define';
import AutoCompleteSelect from './AutoCompleteSelect/AutoCompleteSelect';
import AutoCompleteText from './AutoCompleteText/AutoCompleteText.tsx';
import CheckboxEdit from './CheckboxEdit/CheckboxEdit.tsx';
import DateEdit from './DateEdit/DateEdit';
import NumberEdit from './NumberEdit/NumberEdit';
import SingleSelect from './SingleSelect/SingleSelect';
import TextEdit from './TextEdit/TextEdit';

export const EditorMapper = {
	[FormFieldEditorType.Text]: TextEdit,
	[FormFieldEditorType.Number]: NumberEdit,
	[FormFieldEditorType.SingleSelect]: SingleSelect,
	[FormFieldEditorType.Date]: DateEdit,
	[FormFieldEditorType.AutoCompleteSelect]: AutoCompleteSelect,
	[FormFieldEditorType.AutoCompleteText]: AutoCompleteText,
	[FormFieldEditorType.Checkbox]: CheckboxEdit,
};
