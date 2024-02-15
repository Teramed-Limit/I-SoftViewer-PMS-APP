import React, { useEffect } from 'react';

import { ControllerRenderProps, useFormContext } from 'react-hook-form'; // RenderComponent 的 props 類型定義

import { FormField } from '../../../interface/form-editor/form-editor-define.ts';
import { dobToAge } from '../../../utils/general.ts';
import { EditorMapper } from '../Editor/editorMapper.ts';

// RenderComponent 的 props 類型定義
interface Props {
	field: ControllerRenderProps;
	fieldDef: FormField;
	error: boolean;
	errorText: any;
}

const registerCalculateMethod = {
	dobToAge,
};

function RenderComponent(props: Props) {
	const { fieldDef } = props;
	const { setValue, watch } = useFormContext(); // 從 context 中獲取 setValue
	const fieldValue = watch(fieldDef.id);

	useEffect(() => {
		// 根據依賴欄位值自動填充當前欄位的邏輯
		if (fieldValue && fieldDef.dependentFieldId && fieldDef.calculateMethod) {
			if (!registerCalculateMethod[fieldDef.calculateMethod]) {
				console.error(`calculateMethod ${fieldDef.calculateMethod} not found`);
				return;
			}
			const calculatedValue = registerCalculateMethod[fieldDef.calculateMethod](fieldValue);
			setValue(fieldDef.dependentFieldId, calculatedValue);
		}
	}, [fieldDef.calculateMethod, fieldDef.dependentFieldId, fieldValue, setValue]);

	const FormComponent = EditorMapper[fieldDef.type];
	if (!FormComponent) return <React.Fragment key={fieldDef.id} />;

	return <FormComponent {...props} />;
}

export default RenderComponent;
