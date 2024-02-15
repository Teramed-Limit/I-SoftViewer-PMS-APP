import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Controller, useFormContext } from 'react-hook-form';

import ImageDragAndDrop from '../../Components/ImageDragAndDrop/ImageDragAndDrop';
import { RegistrationFormData } from '../../interface/registration.ts';

function ExamAttachment() {
	const methods = useFormContext<RegistrationFormData>();

	const { control } = methods;

	const renderImageDragAndDrop = (label: string, name: any) => {
		return (
			<Stack flex="1 1 33%">
				<Controller
					name={name}
					control={control}
					render={({ field: { onChange, value } }) => {
						return <ImageDragAndDrop label={label} value={value} onChange={onChange} />;
					}}
				/>
			</Stack>
		);
	};

	return (
		<Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
			{renderImageDragAndDrop('Upload Referring Letter', 'referringLetterAttachment')}
			{renderImageDragAndDrop('Upload Old Report', 'oldReportAttachment')}
			{renderImageDragAndDrop('Upload Other Document', 'otherAttachment')}
		</Stack>
	);
}

export default ExamAttachment;
