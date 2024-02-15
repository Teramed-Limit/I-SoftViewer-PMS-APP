import React from 'react';

import { Stack, Tab, Tabs } from '@mui/material';

import TabPanel from '../../Components/TabPanel/TabPanel';
import CenterDoctorSetting from '../../Containers/CenterDoctorSetting/CenterDoctorSetting';
import CodeListSetting from '../../Containers/CodeListSetting/CodeListSetting';
import ExamItemSetting from '../../Containers/ExamItemSetting/ExamItemSetting';

function Settings() {
	const [value, setValue] = React.useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack sx={{ width: '100%' }} direction="column">
			<Stack sx={{ borderBottom: 1, borderColor: 'divider', flex: '1 1 auto' }}>
				<Tabs value={value} onChange={handleChange}>
					<Tab label="CodeList" />
					<Tab label="Unit / Doctor" />
					<Tab label="Exam Item" />
				</Tabs>
			</Stack>
			<TabPanel value={value} direction="row" index={0}>
				<CodeListSetting />
			</TabPanel>
			<TabPanel value={value} direction="row" index={1}>
				<CenterDoctorSetting />
			</TabPanel>
			<TabPanel value={value} direction="row" index={2}>
				<ExamItemSetting />
			</TabPanel>
		</Stack>
	);
}

export default Settings;
