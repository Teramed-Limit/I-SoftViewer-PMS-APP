import React, { useEffect, useState } from 'react';

import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useFormContext, useWatch } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import FormEditorV2 from '../../Components/FormEditorV2/FormEditorV2.tsx';
import { define } from '../../constant/setting-define.tsx';
import useHttpRequest from '../../hooks/useHttpRequest.ts';
import { ExamItemEntity } from '../../interface/exam-item.ts';
import { RegistrationFormData } from '../../interface/registration.ts';
import { atomSite } from '../../recoil/atoms/site.ts';
import BillingInfo from '../BillingInfo/BillingInfo.tsx';
import ExamAttachment from '../ExamAttachment/ExamAttachment.tsx';
import ExamItemList from '../ExamItemList/ExamItemList.tsx';
import classes from './RegistrationForm.module.scss';

interface Props {
	children?: React.ReactNode;
}

function RegistrationForm({ children }: Props) {
	const site = useRecoilValue(atomSite);
	// 偵測 modality 變動，取得對應的 examItemOptions
	const { sendRequest } = useHttpRequest<ExamItemEntity[]>();

	const methods = useFormContext<RegistrationFormData>();
	const { setValue, control } = methods;

	const [examItemOptions, setExamItemOption] = useState<ExamItemEntity[]>([]);

	const watchModality = useWatch({ control, name: 'modality' });
	useEffect(() => {
		if (watchModality && site?.siteId) {
			sendRequest({
				url: `/examItem/query?filter=siteId=${site.siteId}^modality=${watchModality}`,
				method: 'get', // 請求方法
				onSuccess: (data) => {
					if (data.length === 0) setValue('examItems', []);
					if (data.some((x) => x.modality !== watchModality)) setValue('examItems', []);
					setExamItemOption(data);
				},
				showNotification: false,
			});
		} else {
			setValue('examItems', []);
			setExamItemOption([]);
		}
	}, [watchModality, sendRequest, setValue, site]);

	return (
		<>
			<FormEditorV2 isOuterHasForm formDef={define.register_patient} formDataChanged={() => {}} />
			<Stack direction="row" spacing={3}>
				<Stack flex="1 1 auto" direction="column" spacing={1}>
					<ExamItemList examItemOptions={examItemOptions} />
				</Stack>
				<Stack flex="0 0 500px" spacing={1}>
					<BillingInfo />
				</Stack>
			</Stack>
			<Stack direction="column" spacing={1}>
				<Typography variant="h5" component="div" className="header">
					Attachment
				</Typography>
				<ExamAttachment />
			</Stack>
			<Box className={classes.floatBottom}>
				<Stack spacing={1} direction="row" justifyContent="end">
					{children}
				</Stack>
			</Box>
		</>
	);
}

export default RegistrationForm;
