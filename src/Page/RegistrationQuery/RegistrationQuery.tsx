import { useEffect, useState } from 'react';

import { Button, Stack } from '@mui/material';

import GridTable from '../../Components/GridTable/GridTable';
import { gridDefine } from '../../constant/setting-define';
import useHttpRequest from '../../hooks/useHttpRequest.ts';
import { RegistrationEntity } from '../../interface/registration.ts';

function RegistrationQuery() {
	const { sendRequest } = useHttpRequest<RegistrationEntity[]>();
	const [registrationList, setRegistrationList] = useState<RegistrationEntity[]>([]);

	useEffect(() => {
		sendRequest({
			url: '/registration',
			method: 'get',
			onSuccess: (data) => {
				setRegistrationList(data);
			},
			onError: (_) => {},
			showNotification: false,
		});
	}, [sendRequest]);

	const onDaysQuery = (days: number) => {
		sendRequest({
			url: `/registration/query/day/${days}`,
			method: 'get',
			onSuccess: (data) => {
				setRegistrationList(data);
			},
			onError: (_) => {},
			showNotification: false,
		});
	};

	return (
		<Stack style={{ width: '100%' }} direction="column" spacing={1}>
			<Stack direction="row" spacing={1}>
				<Button variant="contained" onClick={() => onDaysQuery(3650)}>
					All
				</Button>
				<Button variant="contained" onClick={() => onDaysQuery(0)}>
					Today
				</Button>
				<Button variant="contained" onClick={() => onDaysQuery(7)}>
					Week
				</Button>
				<Button variant="contained" onClick={() => onDaysQuery(30)}>
					Month
				</Button>
			</Stack>
			<div style={{ flex: '1 1 auto', width: '100%' }} id="grid" className="ag-theme-quartz">
				<GridTable
					rowHeight={70}
					rowSelection="multiple"
					columnDefs={gridDefine.study.colDef}
					rowData={registrationList}
				/>
			</div>
		</Stack>
	);
}

export default RegistrationQuery;
