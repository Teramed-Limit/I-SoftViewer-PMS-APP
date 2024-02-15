import { useEffect } from 'react';

import { Box, FormLabel, Stack, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import SingleSelect from '../../Components/FormEditorV2/Editor/SingleSelect/SingleSelect.tsx';
import { staticOptionType } from '../../constant/static-options.ts';
import { SelectionField } from '../../interface/form-editor/report-field/selection-field.ts';
import { PayerEntity } from '../../interface/payer.ts';
import { RegistrationFormData } from '../../interface/registration.ts';

const payerTypeField = {
	id: 'payerType',
	label: '',
	type: 'SingleSelect',
	optionSource: {
		type: 'static',
		source: 'payerType',
		key: 'value',
		labelKey: 'label',
	},
} as SelectionField;

function BillingInfo() {
	const methods = useFormContext<RegistrationFormData>();
	const {
		control,
		formState: { errors },
		setValue,
	} = methods;

	// 付款人類型 referringPhysician, unit, patient
	const watchPayerType = useWatch({ control, name: 'payerType' });
	// 設定之折扣
	const watchDefaultDiscount = useWatch({ control, name: 'defaultDiscount' });
	// 自定義折扣
	const watchCustomDiscount = useWatch({ control, name: 'customDiscount' });
	// FromHA
	const watchFromHA = useWatch({ control, name: 'fromHA' });
	// 付款人單位
	const watchPaymentUnitName = useWatch({ control, name: 'paymentUnitName' });
	// 當 payerType 為 referringPhysician 時，預設 payer 為 referringPhysician
	const watchReferringPhysician = useWatch({ control, name: 'referringPhysician' });

	// 若有選擇 payerType為 referringPhysician，則自動填入 paymentUnitName 為 referringPhysician
	useEffect(() => {
		if (watchReferringPhysician && watchPayerType === 'referringPhysician') {
			setValue('paymentUnitName', watchReferringPhysician);
		}
	}, [watchReferringPhysician, watchPayerType, setValue]);

	// 監控paymentUnitName來給予預設折扣
	useEffect(() => {
		switch (watchPayerType) {
			case 'patient':
				setValue('defaultDiscount', watchFromHA ? 0.8 : 1);
				break;
			default:
				break;
		}
	}, [setValue, watchFromHA, watchPayerType]);

	// 計價
	// 計算總價
	const watchExamItems = useWatch({ control, name: 'examItems' }) || [];
	const sumOfPrice = watchExamItems.reduce((acc, item) => acc + item.price, 0);
	// 計算折扣後的總價
	const usingDiscount = watchCustomDiscount !== 0 ? watchCustomDiscount : watchDefaultDiscount;
	const sumOfDiscount = sumOfPrice * usingDiscount;

	return (
		<>
			<Stack direction="row" alignItems="center" spacing={1}>
				<Typography variant="h5" component="div">
					Bill to
				</Typography>
				<Controller
					name="payerType"
					control={control}
					rules={{ required: 'Field is required' }}
					defaultValue="referringPhysician"
					render={({ field }) => {
						return (
							<SingleSelect
								field={field as any}
								fieldDef={payerTypeField}
								error={!!errors.payerType}
								errorText={errors.payerType?.message || ''}
								variant="standard"
								onGetSelectedOptions={() => {
									setValue('paymentUnitName', '');
									setValue('payerId', '');
								}}
							/>
						);
					}}
				/>
				<Controller
					name="fromHA"
					control={control}
					render={({ field }) => {
						return (
							<FormControlLabel
								control={<Checkbox {...field} checked={field?.value || false} />}
								label="From HA"
							/>
						);
					}}
				/>
			</Stack>
			{/* Conditional rendering based on selectedValue */}
			{watchPayerType !== 'patient' && (
				<Stack spacing={0.5}>
					<Controller
						name="paymentUnitName"
						defaultValue=""
						control={control}
						rules={{ required: 'Field is required' }}
						render={({ field }) => {
							return (
								<SingleSelect
									baseTextFieldProps={{ sx: { width: '320px' } }}
									field={field as any}
									fieldDef={{
										id: 'paymentUnitName',
										label: 'Unit',
										type: 'SingleSelect',
										optionSource: {
											type: 'customHttp',
											source: `/paymentUnit/query?filter=PaymentType=${watchPayerType}`,
											key: 'name',
											labelKey: 'name',
										},
									}}
									error={!!errors.paymentUnitName}
									errorText={errors.paymentUnitName?.message || ''}
									variant="standard"
								/>
							);
						}}
					/>
					<Controller
						name="payerId"
						control={control}
						defaultValue=""
						rules={{ required: 'Field is required' }}
						render={({ field }) => {
							return (
								<SingleSelect
									baseTextFieldProps={{ sx: { width: '320px' } }}
									field={field as any}
									fieldDef={{
										id: 'payerId',
										label: 'Name',
										type: 'SingleSelect',
										optionSource: {
											type: 'customHttp',
											source: `/payer/query?filter=PaymentUnitName=${watchPaymentUnitName || undefined}`,
											key: 'payerId',
											labelKey: 'name',
										},
									}}
									error={!!errors.payerId}
									errorText={errors.payerId?.message || ''}
									variant="standard"
									autoSelectWhenOnlyOneOption
									onGetSelectedOptions={(selectedOption: PayerEntity) => {
										if (!selectedOption) return;
										const discount = selectedOption.discount * 10 - (watchFromHA ? 1 : 0);
										setValue('defaultDiscount', discount / 10);
									}}
								/>
							);
						}}
					/>
				</Stack>
			)}
			{watchPayerType === 'patient' && (
				<Box>
					<FormLabel>Payment Method</FormLabel>
					<Controller
						name="paymentMethod"
						defaultValue="cash"
						control={control}
						render={({ field }) => (
							<RadioGroup {...field} row>
								{staticOptionType.paymentMethod.map((item) => {
									return (
										<FormControlLabel
											key={item.value}
											value={item.value}
											control={<Radio />}
											label={item.label}
										/>
									);
								})}
							</RadioGroup>
						)}
					/>
				</Box>
			)}

			<Stack direction="row" spacing={2} alignItems="center">
				<TextField
					sx={{ width: '80px', p: 0 }}
					type="number"
					label="Total"
					variant="standard"
					value={sumOfPrice}
					InputProps={{ readOnly: true }}
				/>
				<Controller
					name="defaultDiscount"
					defaultValue={0}
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: '80px', p: 0 }}
							type="number"
							label="Basic Dis."
							variant="standard"
							InputProps={{
								readOnly: true,
								style: { textDecoration: watchCustomDiscount !== 0 ? 'line-through' : 'none' },
							}}
						/>
					)}
				/>
				<Controller
					name="customDiscount"
					control={control}
					defaultValue={0}
					render={({ field }) => (
						<TextField
							{...field}
							sx={{ width: '80px', p: 0 }}
							onChange={(e) => setValue('customDiscount', +e.target.value)}
							type="number"
							label="Special Dis."
							variant="standard"
							inputProps={{
								step: 0.1,
								min: 0,
								max: 1,
							}}
						/>
					)}
				/>
				<TextField
					sx={{ width: '80px', p: 0 }}
					type="number"
					label="Dis. Total"
					variant="standard"
					value={sumOfDiscount || 0}
					InputProps={{ readOnly: true }}
				/>
			</Stack>
		</>
	);
}

export default BillingInfo;
