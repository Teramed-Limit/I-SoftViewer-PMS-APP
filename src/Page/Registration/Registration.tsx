import React, { useCallback, useEffect } from 'react';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Button, Stack } from '@mui/material';
import { AxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import BookingList from '../../Components/BookingList/BookingList';
import PaperContainer from '../../Components/PaperConainer/PaperContainer';
import RegistrationForm from '../../Containers/RegistrationForm/RegistrationForm.tsx';
import useHttpRequest from '../../hooks/useHttpRequest.ts';
import { BookingEntity } from '../../interface/booking';
import { RegistrationFormData } from '../../interface/registration.ts';
import { SiteEntity } from '../../interface/site.ts';
import { atomSite } from '../../recoil/atoms/site.ts';
import { http } from '../../utils/api/api.ts';

const initRegistrationData: RegistrationFormData = {
	studyInstanceUID: '',
	patientId: '',
	patientName: '',
	patientCHName: '',
	patientSex: '',
	patientAge: 0,
	patientDOB: new Date(),
	contactPhone: '',
	examNumber: '',
	accessionNumber: '',
	studyDate: new Date(),
	modality: 'US',
	studyDescription: '',
	referringPhysician: '',
	referringPhysicianNumber: '',
	reportingPhysician: '',
	performingPhysician: '',
	fromHA: false,
	payerType: 'referringPhysician',
	paymentUnitName: '',
	payerId: '',
	paymentMethod: '',
	defaultDiscount: 1,
	customDiscount: 0,
	siteId: '',
	bookId: '',
	examItems: [
		{
			itemId: '',
			itemName: '',
			number: 1,
			price: 0,
		},
	],
	createDateTime: new Date(),
	modifiedDateTime: new Date(),
	oldReportAttachment: [],
	otherAttachment: [],
	referringLetterAttachment: [],
	existingReferringLetterAttachment: [],
	existingOldReportAttachment: [],
	existingOtherAttachment: [],
};

function Registration() {
	const { sendRequest } = useHttpRequest<any>();
	// 表單Hook
	const methods = useForm<RegistrationFormData>({ defaultValues: initRegistrationData });
	const { handleSubmit, getValues, setValue, reset } = methods;
	const [needRenew, setNeedRenew] = React.useState(false);
	const [bookingData, setBookingData] = React.useState<BookingEntity[]>([]);
	const site = useRecoilValue(atomSite);

	const onSelectBooking = (booking: BookingEntity) => {
		reset({
			...getValues(),
			...booking,
		});
	};

	const onRenewAccNumber = useCallback(
		({ siteId }: SiteEntity) => {
			http.get<string>(`registration/accessionNumber/site/${siteId}`).subscribe((data) => {
				setValue('accessionNumber', data);
				setValue('examNumber', data);
				setNeedRenew(false);
			});
		},
		[setValue],
	);

	// 表單提交
	const onSubmit = (formData: RegistrationFormData) => {
		const bodyForm = new FormData();
		// Form Data
		bodyForm.append('jsonData', JSON.stringify(formData));
		// Attachments
		const fileKey = ['referringLetterAttachment', 'oldReportAttachment', 'otherAttachment'];
		fileKey.forEach((key) => {
			formData[key].forEach((file) => bodyForm.append(key, file));
		});

		sendRequest({
			url: '/registration/register', // API路徑
			body: bodyForm, // 請求體
			method: 'post', // 請求方法
			onSuccess: () => {
				http.get<string>(`registration/accessionNumber/site/${site.siteId}`).subscribe((data) => {
					setNeedRenew(false);
					onGetBookingData();
					reset({ ...initRegistrationData, examNumber: data, accessionNumber: data });
				});
			},
			onError: (error: AxiosError<string>) => {
				// 處理錯誤
				if (error.response?.data === 'Please renew serial number and try again.') {
					setNeedRenew(true);
				}
			},
		});
	};

	const onGetBookingData = useCallback(() => {
		if (!site) return;
		http.get<BookingEntity[]>(`/booking/site/${site.siteId}/today`).subscribe((data) => {
			setBookingData(data);
		});
	}, [site]);

	useEffect(() => {
		if (!site) return;
		onRenewAccNumber(site);
	}, [onRenewAccNumber, site]);

	useEffect(() => {
		onGetBookingData();
	}, [onGetBookingData]);

	return (
		<>
			<Stack spacing={2} direction="row" sx={{ width: '100%' }}>
				<Stack sx={{ minWidth: '250px', overflow: 'auto' }} spacing={1} direction="column">
					<PaperContainer style={{ height: '100%' }} title="	Today's Booking">
						<BookingList bookingData={bookingData} onSelectBooking={onSelectBooking} />
					</PaperContainer>
				</Stack>
				<Stack sx={{ width: '100%', overflow: 'auto' }} spacing={1} direction="column">
					<PaperContainer title="">
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<RegistrationForm>
									{needRenew && (
										<Button
											size="medium"
											color="warning"
											variant="contained"
											sx={{ mt: 1 }}
											onClick={() => onRenewAccNumber(site)}
										>
											Renew Accession Number
										</Button>
									)}
									<Button
										type="submit"
										startIcon={<HowToRegIcon />}
										size="medium"
										variant="contained"
										sx={{ mt: 1 }}
									>
										Register
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

export default Registration;
