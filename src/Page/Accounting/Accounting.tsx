import React from 'react';

import { Stack, Tab, Tabs } from '@mui/material';

import TabPanel from '../../Components/TabPanel/TabPanel';
import BillToReferralDoctor from '../../Containers/BillToReferralDoctor/BillToReferralDoctor';
import PayToClinicDoctor from '../../Containers/PayToClinicDoctor/PayToClinicDoctor.tsx';

function Accounting() {
	const [value, setValue] = React.useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Stack sx={{ width: '100%' }} direction="column">
			<Stack sx={{ borderBottom: 1, borderColor: 'divider', flex: '1 1 auto' }}>
				<Tabs value={value} onChange={handleChange}>
					<Tab
						iconPosition="start"
						// icon={<AttachMoneyIcon fontSize="small" />}
						label="Credit by Clinic Doctor"
					/>
					<Tab
						iconPosition="start"
						// icon={<ReceiptIcon fontSize="small" />}
						label="Bill To Refering Doctor / Unit"
					/>
				</Tabs>
			</Stack>
			<TabPanel value={value} direction="row" index={0}>
				<PayToClinicDoctor />
			</TabPanel>
			<TabPanel value={value} direction="row" index={1}>
				<BillToReferralDoctor />
			</TabPanel>
		</Stack>
	);
}

export default Accounting;
