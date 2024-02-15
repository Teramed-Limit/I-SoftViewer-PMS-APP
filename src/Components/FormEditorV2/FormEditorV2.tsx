import React, { useState } from 'react';

import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Controller, useFormContext, UseFormReturn } from 'react-hook-form';

import { FormEditorDef, FormField } from '../../interface/form-editor/form-editor-define';
import RenderComponent from './RenderComponent/RenderComponent';

interface Props {
	formDef: FormEditorDef;
	formDataChanged: (formData: any, methods: UseFormReturn<any>) => void;
	header?: string;
	children?: React.ReactNode;
	isOuterHasForm?: boolean; // 是否在外層已有 <form> 標籤
}

function FormEditorV2({ formDef, formDataChanged, header = '', isOuterHasForm, children }: Props) {
	const [sectionCount] = useState(formDef.sections.length);

	const methods = useFormContext();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = methods;

	// 只有在表單提交時才會執行
	const onSubmit = (data) => {
		formDataChanged(data, methods);
	};

	// 根據 isOuterHasForm 決定是否使用 <form> 標籤
	const formContent = (
		<Stack direction="column" spacing={1}>
			{formDef.sections.map((section) => {
				return (
					<React.Fragment key={section.id}>
						<Typography variant="h5" component="div" className="header">
							{section.label}
						</Typography>
						<Stack
							sx={{ m: 0, flex: `${100 / sectionCount}%` }}
							id={`section-${section.id}`}
							direction={section.direction || 'column'}
							spacing={1}
							flex={section.flex || '1 1 auto'}
						>
							{section.fields.map((fieldDef: FormField) => {
								if (fieldDef.hide) return <React.Fragment key={fieldDef.id} />;

								return (
									<Stack
										key={fieldDef.id}
										sx={{ flex: `0 0 ${formDef.eachFieldWidth || 'auto'}` }}
										spacing={1}
									>
										<Controller
											name={fieldDef.id}
											control={control}
											defaultValue=""
											rules={fieldDef.validate}
											render={({ field }) => (
												<RenderComponent
													field={field}
													fieldDef={fieldDef}
													error={!!errors[fieldDef.id]}
													errorText={errors[fieldDef.id]?.message}
												/>
											)}
										/>
									</Stack>
								);
							})}
						</Stack>
					</React.Fragment>
				);
			})}
			<Stack sx={{ mt: 1 }} direction="row" spacing={1} justifyContent="end">
				{children}
			</Stack>
		</Stack>
	);

	return (
		<>
			{header !== '' && <h2>{header}</h2>}
			{isOuterHasForm ? formContent : <form onSubmit={handleSubmit(onSubmit)}>{formContent}</form>}
		</>
	);
}

export default FormEditorV2;
