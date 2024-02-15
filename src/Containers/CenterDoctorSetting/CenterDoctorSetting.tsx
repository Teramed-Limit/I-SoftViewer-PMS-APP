import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import { SelectionChangedEvent } from 'ag-grid-community/dist/lib/events';

import GridTableEditor from '../../Components/GridTableEditor/GridTableEditor';
import { define, gridDefine } from '../../constant/setting-define';
import { staticOptionType } from '../../constant/static-options.ts';
import useHttpRequest from '../../hooks/useHttpRequest';
import { PayerEntity } from '../../interface/payer.ts';
import { PaymentUnitWithPayer } from '../../interface/payment-unit.ts';

function CenterDoctorSetting() {
	// State
	const [paymentUnitWithPayers, setPaymentUnitWithPayers] = useState<PaymentUnitWithPayer[]>([]);
	const [selectedPaymentUnit, setSelectedPaymentUnit] = useState<PaymentUnitWithPayer | null>(null);
	const [payerList, setPayerList] = useState<PayerEntity[] | undefined>(undefined);

	const { sendRequest } = useHttpRequest<PaymentUnitWithPayer[]>(); // 指定泛型參數為預期的響應類型

	useEffect(() => {
		sendRequest({
			url: '/paymentUnit/withPayers', // API路徑
			method: 'get', // 請求方法
			onSuccess: (data) => {
				setPaymentUnitWithPayers(data);
			},
			showNotification: false,
		});
	}, [sendRequest]);

	const onSelectionChanged = (event: SelectionChangedEvent<PaymentUnitWithPayer>) => {
		setSelectedPaymentUnit(event.api.getSelectedRows()[0]);
		setPayerList(
			event.api
				.getSelectedRows()
				.map((row) => row?.payers || [])
				.flat(),
		);
	};

	return (
		<Stack spacing={2} direction="column" sx={{ width: '100%', overflow: 'hidden' }}>
			<Stack
				sx={{ width: '100%', flex: 1.8, overflow: 'auto', position: 'relative' }}
				spacing={1}
				direction="column"
			>
				<GridTableEditor<PaymentUnitWithPayer>
					apiPath="paymentUnit"
					initFormData={{
						paymentType: staticOptionType.payerType[0].value,
						name: '',
						otherName: '',
						refNo: '',
						address: '',
						contact: '',
						payers: [],
					}}
					identityId="name"
					columnDefs={gridDefine.paymentUnit.colDef}
					formDef={define.paymentUnit}
					rowData={paymentUnitWithPayers}
					rowSelection="single"
					onSelectionChanged={onSelectionChanged}
				/>
			</Stack>
			<Stack
				sx={{ width: '100%', flex: 1, overflow: 'auto', position: 'relative' }}
				spacing={1}
				direction="column"
			>
				<GridTableEditor
					apiPath="payer"
					identityId="payerId"
					columnDefs={gridDefine.payer.colDef}
					formDef={define.payer}
					rowData={payerList || []}
					canAddRow={payerList !== undefined}
					initFormData={{
						// payerId: 'string',
						name: 'Dr. ',
						otherName: '',
						discount: 1,
						paymentUnitName: selectedPaymentUnit?.name || '',
					}}
					rowSelection="single"
				/>
			</Stack>
		</Stack>
	);
}

export default CenterDoctorSetting;
