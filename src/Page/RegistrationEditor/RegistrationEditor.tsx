import { useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Button, Stack } from '@mui/material';
import { AxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import PaperContainer from '../../Components/PaperConainer/PaperContainer.tsx';
import RegistrationForm from '../../Containers/RegistrationForm/RegistrationForm.tsx';
import useHttpRequest from '../../hooks/useHttpRequest.ts';
import { RegistrationFormData } from '../../interface/registration.ts';
import { atomSite } from '../../recoil/atoms/site.ts';

function RegistrationEditor() {
	const site = useRecoilValue(atomSite);
	const { studyInstanceUID } = useParams();
	const { sendRequest } = useHttpRequest<RegistrationFormData>();
	// 表單Hook
	const methods = useForm<RegistrationFormData>({ defaultValues: {} });
	const { handleSubmit, reset } = methods;

	useEffect(() => {
		if (!studyInstanceUID || !site) return;
		sendRequest({
			url: `/registration/studyInstanceUID/${studyInstanceUID}/site/${site.siteId}`,
			method: 'get',
			onSuccess: (data) => {
				reset({
					...data,
					patientDOB: new Date(data.patientDOB),
					studyDate: new Date(data.studyDate),
				});
			},
			onError: (_) => {},
			showNotification: false,
		});
	}, [reset, sendRequest, site, studyInstanceUID]);

	// 表單提交
	const onSubmit = (registrationFormData: RegistrationFormData) => {
		const bodyFormData = { ...registrationFormData };
		const bodyForm = new FormData();

		// Attachments
		const fileKey = [
			{
				newFiles: 'referringLetterAttachment',
				existFiles: 'existingReferringLetterAttachment',
			},
			{
				newFiles: 'oldReportAttachment',
				existFiles: 'existingOldReportAttachment',
			},
			{
				newFiles: 'otherAttachment',
				existFiles: 'existingOtherAttachment',
			},
		];

		fileKey.forEach((key) => {
			const existFiles: string[] = [];
			registrationFormData[key.newFiles].forEach((file) => {
				// 如果是 File 物件，直接放到 FormData 中
				if (file instanceof File) bodyForm.append(key.newFiles, file);
				// 如果是 string，代表是已經上傳的檔案，直接放到 FormData 中
				else existFiles.push(file);
			});
			bodyFormData[key.existFiles] = existFiles;
		});

		// Form Data
		bodyForm.append('jsonData', JSON.stringify(bodyFormData));

		sendRequest({
			url: '/registration/register', // API路徑
			body: bodyForm, // 請求體
			method: 'put', // 請求方法
			onSuccess: () => {},
			onError: (_: AxiosError<string>) => {},
		});
	};

	return (
		<>
			<Stack spacing={2} direction="row" sx={{ width: '100%' }}>
				<Stack sx={{ width: '100%', overflow: 'auto' }} spacing={1} direction="column">
					<PaperContainer title="">
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<RegistrationForm>
									<Button
										startIcon={<EditIcon />}
										type="submit"
										size="medium"
										variant="contained"
										sx={{ mt: 1 }}
									>
										Update
									</Button>
								</RegistrationForm>
							</form>
						</FormProvider>
					</PaperContainer>
				</Stack>
			</Stack>
		</>
	);
}

export default RegistrationEditor;
