import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as R from 'ramda';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { RegistrationExamItem } from '../../interface/exam-item.ts';
import { RegistrationFormData } from '../../interface/registration.ts';

interface Props {
	examItemOptions: RegistrationExamItem[];
}

function ExamItemList({ examItemOptions }: Props) {
	const methods = useFormContext<RegistrationFormData>();

	const {
		control,
		formState: { errors },
		setValue,
	} = methods;

	const { fields, append, remove } = useFieldArray({
		control,
		rules: { minLength: 1 },
		name: 'examItems',
	});

	return (
		<>
			<Typography variant="h5" component="div" className="header">
				Exam Item
			</Typography>
			<Stack spacing={1}>
				{fields.map((item, index) => {
					const basicPath = `examItems[${index}]`;
					return (
						<Stack
							key={item.id}
							sx={{ flex: '1 1 auto', mb: 1, height: '40px' }}
							spacing={1}
							direction="row"
						>
							<Controller
								name={`${basicPath}.itemName` as `examItems.0.itemName`}
								control={control}
								rules={{ required: 'Field is required' }}
								render={({ field }) => (
									<Autocomplete
										{...field}
										value={
											examItemOptions?.find((option) => option.itemName === field.value) || null
										}
										onChange={(_, value) => {
											field.onChange(value?.itemName || null);
											setValue(
												`examItems[${index}].price` as `examItems.0.price`,
												value?.price || 0,
											);
											setValue(
												`examItems[${index}].itemId` as `examItems.0.itemId`,
												value?.itemId || '',
											);
											setValue(
												`examItems[${index}].number` as `examItems.0.number`,
												value?.number || 1,
											);
										}}
										options={examItemOptions}
										defaultValue={null}
										getOptionLabel={(option) => option.itemName}
										getOptionKey={(option) => option.itemId}
										style={{ width: 500 }}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Exam Item"
												variant="outlined"
												error={!!R.path(['examItems', index, 'itemName'], errors)}
											/>
										)}
									/>
								)}
							/>
							<Controller
								name={`${basicPath}.number` as `examItems.0.number`}
								control={control}
								defaultValue={0}
								rules={{ required: 'Field is required' }}
								render={({ field }) => (
									<TextField
										{...field}
										type="number"
										label="Number of Jobs"
										variant="outlined"
										onChange={(e) =>
											setValue(`${basicPath}.number` as `examItems.0.number`, +e.target.value)
										}
										error={!!R.path(['examItems', index, 'number'], errors)}
									/>
								)}
							/>
							<Controller
								name={`${basicPath}.price` as `examItems.0.price`}
								control={control}
								defaultValue={0}
								rules={{ required: 'Field is required' }}
								render={({ field }) => (
									<TextField
										{...field}
										type="number"
										label="Price"
										variant="outlined"
										onChange={(e) =>
											setValue(`${basicPath}.price` as `examItems.0.price`, +e.target.value)
										}
										error={!!R.path(['examItems', index, 'price'], errors)}
									/>
								)}
							/>
							<IconButton onClick={() => remove(index)}>
								<DeleteIcon color="error" />
							</IconButton>
						</Stack>
					);
				})}
				<Button
					sx={{ flex: '1' }}
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={() =>
						append({
							itemId: '',
							itemName: '',
							number: 1,
							price: 0,
						})
					}
				>
					Add Exam Code
				</Button>
			</Stack>
		</>
	);
}

export default ExamItemList;
