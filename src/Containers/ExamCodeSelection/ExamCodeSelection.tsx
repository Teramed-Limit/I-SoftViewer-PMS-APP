import { ChangeEvent, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useRecoilValue } from 'recoil';

import PaperContainer from '../../Components/PaperConainer/PaperContainer';
import useHttpRequest from '../../hooks/useHttpRequest.ts';
import { RegistrationExamItem } from '../../interface/exam-item.ts';
import { atomSite } from '../../recoil/atoms/site.ts';

interface Props {
	examItems: RegistrationExamItem[];
	setExamItems: React.Dispatch<React.SetStateAction<RegistrationExamItem[]>>;
	examType: string;
}

function ExamCodeSelection({ examItems, setExamItems, examType }: Props) {
	const site = useRecoilValue(atomSite);
	const [billTo, setBillTo] = useState('doctor');

	const { sendRequest } = useHttpRequest<RegistrationExamItem[]>();

	const [examItemOptions, setExamItemOption] = useState<RegistrationExamItem[]>([]);

	useEffect(() => {
		sendRequest({
			// url: `/examItem/modality/${examType}`, // API路徑
			url: `/examItem/query?filter=siteId=${site.siteId}^modality=${examType}`,
			method: 'get', // 請求方法
			onSuccess: (data) => {
				setExamItemOption(data);
			},
		});
	}, [examType, sendRequest, site.siteId]);

	const handleBillTo = (event: ChangeEvent<HTMLInputElement>) => {
		setBillTo((event.target as HTMLInputElement).value);
	};

	const handleNewExamCode = (_) => {
		setExamItems((list) => [
			...list,
			{
				itemId: 'string',
				itemName: 'string',
				modality: 'string',
				number: 20,
				price: 200,
			},
		]);
	};

	const handleDeleteExamCode = (_) => {
		setExamItems((list) => list.slice(0, -1));
	};

	return (
		<Stack direction="row" spacing={1}>
			{/* Exam Item */}
			<PaperContainer style={{ flex: '1 1 50%' }} title="Exam Item">
				<Stack spacing={1}>
					{examItems.map((examCode) => {
						return (
							<Stack
								key={examCode.itemId}
								sx={{ flex: '1 1 auto', mb: 1, height: '40px' }}
								spacing={1}
								direction="row"
							>
								<Autocomplete
									options={examItemOptions}
									getOptionLabel={(option) => option.itemName}
									getOptionKey={(option) => option.itemId}
									style={{ width: 500 }}
									renderInput={(params) => (
										<TextField {...params} label="Exam Item" variant="outlined" />
									)}
								/>
								<TextField label="Number" variant="outlined" />
								<TextField label="Price" variant="outlined" />
								<IconButton onClick={handleDeleteExamCode}>
									<DeleteIcon color="error" />
								</IconButton>
							</Stack>
						);
					})}

					<Button sx={{ flex: '1' }} variant="contained" color="primary" onClick={handleNewExamCode}>
						Add Exam Code
					</Button>
				</Stack>
			</PaperContainer>
			{/* Bill Information */}
			<PaperContainer style={{ flex: '1 1 50%' }} title="Bill Information">
				<Stack direction="row" spacing={1}>
					<Stack direction="column" flex="1 0 auto" spacing={1}>
						<FormControl>
							<RadioGroup value={billTo} onChange={handleBillTo}>
								<FormControlLabel value="doctor" control={<Radio />} label="Bill Doctor" />
								<FormControlLabel value="uni" control={<Radio />} label=" Bill Uni" />
								<FormControlLabel value="cash" control={<Radio />} label="Cash" />
							</RadioGroup>
						</FormControl>
						{billTo === 'doctor' ? (
							<TextField label="Referring Physician" variant="outlined" />
						) : (
							<TextField label="Unit" variant="outlined" />
						)}
					</Stack>
					<Stack direction="column" flex="1 0 auto" spacing={1}>
						<TextField label="Total" variant="outlined" />
						<TextField label="Discount" variant="outlined" />
						<TextField label="Dis. Total" variant="outlined" />
					</Stack>
				</Stack>
			</PaperContainer>
		</Stack>
	);
}

export default ExamCodeSelection;
