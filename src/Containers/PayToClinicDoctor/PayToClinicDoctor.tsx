import React, { useEffect, useRef } from 'react';

import ReceiptIcon from '@mui/icons-material/Receipt';
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ICellRendererParams } from 'ag-grid-community';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import { addDays } from 'date-fns';
import * as R from 'ramda';
import { useSetRecoilState } from 'recoil';

import CustomModal from '../../Components/CustomModal/CustomModal.tsx';
import GridTable from '../../Components/GridTable/GridTable';
import { gridDefine } from '../../constant/setting-define';
import useHttpRequest from '../../hooks/useHttpRequest.ts';
import { useModal } from '../../hooks/useModal.ts';
import { CodeList } from '../../interface/code-list.ts';
import { MessageType } from '../../interface/notification.ts';
import { Payment, PaymentReport } from '../../interface/payment-report.ts';
import { atomCodeList } from '../../recoil/atoms/codeList.ts';
import { atomNotification } from '../../recoil/atoms/notification.ts';
import CodeListService from '../../services/CodeListService.ts';
import EnvService from '../../services/EnvService.ts';
import classes from './PayToClinicDoctor.module.scss';

function PayToClinicDoctor() {
	const { open, setOpen, onModalClose } = useModal({});
	// const {
	// 	open: openExamItemDetails,
	// 	setOpen: setOpenExamItemDetails,
	// 	onModalClose: onExamItemDetailsModalClose,
	// } = useModal({});
	const setNotification = useSetRecoilState(atomNotification);
	const setCodeListMap = useSetRecoilState(atomCodeList);
	const { sendRequest } = useHttpRequest<PaymentReport>();
	const { sendRequest: sendAccountRequest } = useHttpRequest<CodeList[]>();
	const [rowDataOfReporting, setRowDataOfReporting] = React.useState<Payment[]>([]);
	const [rowDataOfScanning, setRowDataOfScanning] = React.useState<Payment[]>([]);
	const [dateRange, setDateRange] = React.useState({ startDate: new Date(), endDate: new Date() });
	const [payeeList, setPayeeList] = React.useState<CodeList[]>([]);
	const [selectedPayee, setPayee] = React.useState<string>('');
	const gridApi = useRef<GridApi<any> | null>(null);

	const handleDateQuery = (days) => {
		const startDate = days === null ? dateRange.startDate : addDays(new Date(), -days);
		const endDate = days === null ? dateRange.endDate : new Date();
		setDateRange({ startDate, endDate });
		fetchData(startDate, endDate);
	};

	// 提取數據的函數
	const fetchData = (startDate, endDate) => {
		if (!selectedPayee) {
			setNotification({
				messageType: MessageType.Warning,
				message: 'Please select the payee.',
			});
			return;
		}
		sendRequest({
			url: '/accounting/payment',
			method: 'get',
			body: { startDate, endDate, payee: selectedPayee },
			onSuccess: (data) => {
				setRowDataOfReporting(data.reportingPayments);
				setRowDataOfScanning(data.scanningPayments);
				gridApi.current?.deselectAll();
			},
			onError: () => {},
			showNotification: false,
		});
	};

	const onSelectionChanged = (event) => {
		const rows = event.api.getSelectedRows();
		if (rows.length > 0) {
			// // 將選中的row中的examItems提取出來，每一個Item分類加總，最後算出金額
			// const examItems = R.flatten(R.pluck('examItems', rows));
			// // 根據ItemId分組
			// const groupByItemId = R.groupBy<ExamItem, string>(R.prop('itemId'), examItems);
			// // 把分組後的數據轉換成Payslip的格式
			//
			// const payslipList = [];
			// Object.keys(groupByItemId).forEach((key) => {
			// 	const items = groupByItemId[key] as ExamItem[];
			// 	const totalNumber = R.sum(R.pluck('number', items));
			// 	const totalPrice = R.sum(R.pluck('total', items));
			// });
		}
	};

	// 設置日期
	const handleDateChange = (field, value) => {
		setDateRange((prev) => ({ ...prev, [field]: value }));
		if (field === 'endDate') {
			fetchData(dateRange.startDate, value);
		}
	};

	// Receipt PDF
	const genPayslipPDF = (typeOfPhysician: string) => {
		// 取得selected row的data
		const selectedRowData = gridApi.current?.getSelectedRows();

		if (!selectedRowData || selectedRowData.length === 0) {
			setNotification({
				messageType: MessageType.Warning,
				message: 'Please select the row to generate the payslip.',
			});
			return;
		}

		// 選中的Row中的Physician，不能重複
		const typeOfPhysicianData = R.uniqBy(R.prop(typeOfPhysician), selectedRowData as any[]);
		// 如果selected row中有多個不一樣的Physician，則不生成PDF
		if (typeOfPhysicianData.length > 1) {
			setNotification({
				messageType: MessageType.Warning,
				message: 'Please select the same physician to generate the payslip.',
			});
			return;
		}

		setOpen(true);
	};

	const newGridDefine = R.append(
		{
			field: 'viewDetails',
			headerName: '',
			width: 140,
			cellRenderer: 'buttonCell',
			cellRendererParams: {
				variant: 'contained',
				label: 'View Details',
				onClick: (params: ICellRendererParams<any>) => {
					if (params.data) {
						// setOpenExamItemDetails(true);
						// setSelectedExamItems(params.data.examItems);
					}
				},
			},
		},
		gridDefine.accountingCredit.colDef,
	);

	useEffect(() => {
		sendAccountRequest({
			url: '/account/codeList?joinText=Title^DoctorEName',
			method: 'get',
			onSuccess: (data) => {
				setPayeeList(data);
				CodeListService.addCodeList('account', data);
				setCodeListMap((oldCodeListMap) => ({
					...oldCodeListMap,
					account: data,
				}));
			},
			showNotification: false,
		});
	}, [sendAccountRequest, setCodeListMap]);

	return (
		<Stack style={{ width: '100%' }} direction="column" spacing={1}>
			<Stack direction="column" spacing={2}>
				<Stack direction="row" spacing={1}>
					<Button variant="contained" onClick={() => handleDateQuery(3650)}>
						All
					</Button>
					<Button variant="contained" onClick={() => handleDateQuery(0)}>
						Today
					</Button>
					<Button variant="contained" onClick={() => handleDateQuery(7)}>
						Week
					</Button>
					<Button variant="contained" onClick={() => handleDateQuery(30)}>
						Month
					</Button>
				</Stack>
				<Stack direction="row" spacing={1}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Autocomplete
							options={payeeList}
							getOptionLabel={(option) => option.label}
							getOptionKey={(option) => option.value}
							style={{ width: 300 }}
							value={payeeList.find((option) => option.value === selectedPayee) || null}
							onChange={(_, newValue) => {
								setPayee(newValue?.value || '');
							}}
							componentsProps={{
								paper: {
									style: {
										width: 'fit-content',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									},
								},
							}}
							renderInput={(params) => <TextField {...params} label="Payee" variant="outlined" />}
						/>
						<DatePicker
							label="Start Date"
							format={EnvService.getDateFormat()}
							value={dateRange.startDate}
							onChange={(date) => handleDateChange('startDate', date)}
						/>
						<DatePicker
							label="End Date"
							format={EnvService.getDateFormat()}
							value={dateRange.endDate}
							onChange={(date) => handleDateChange('endDate', date)}
						/>
					</LocalizationProvider>
					<Button variant="contained" onClick={() => handleDateQuery(null)}>
						Query
					</Button>
				</Stack>
			</Stack>
			<Typography className={classes.section} variant="h6" component="div">
				Reporting Payment
			</Typography>
			<div style={{ flex: '1 1 auto', width: '100%' }} id="grid1" className="ag-theme-quartz">
				<GridTable
					rowSelection="multiple"
					columnDefs={newGridDefine}
					rowData={rowDataOfReporting}
					checkboxSelect
					onSelectionChanged={onSelectionChanged}
					gridReady={(params) => (gridApi.current = params.api)}
				/>
			</div>
			<Typography className={classes.section} variant="h6" component="div">
				Scanning Payment
			</Typography>
			<div style={{ flex: '1 1 auto', width: '100%' }} id="grid2" className="ag-theme-quartz">
				<GridTable
					rowSelection="multiple"
					columnDefs={newGridDefine}
					rowData={rowDataOfScanning}
					checkboxSelect
					onSelectionChanged={onSelectionChanged}
					gridReady={(params) => (gridApi.current = params.api)}
				/>
			</div>
			<Stack justifyContent="end" alignItems="center" direction="row" spacing={1}>
				<Box component="span" sx={{ textAlign: 'end' }}>
					<Button
						sx={{ flex: '1 1 auto' }}
						variant="contained"
						startIcon={<ReceiptIcon />}
						onClick={() => genPayslipPDF('reportingPhysician')}
					>
						Print Payslip
					</Button>
				</Box>
			</Stack>
			{/* <CustomModal */}
			{/*	label="Exam Item Details" */}
			{/*	height="50%" */}
			{/*	width="90%" */}
			{/*	open={openExamItemDetails} */}
			{/*	onModalClose={() => onExamItemDetailsModalClose()} */}
			{/* > */}
			{/*	<div style={{ flex: '1 1 auto', width: '100%' }} id="grid2" className="ag-theme-quartz"> */}
			{/*		<GridTable */}
			{/*			rowSelection="single" */}
			{/*			columnDefs={gridDefine.examItemDetails.colDef} */}
			{/*			rowData={selectedExamItems} */}
			{/*		/> */}
			{/*	</div> */}
			{/* </CustomModal> */}
			<CustomModal height="100%" open={open} onModalClose={() => onModalClose()}>
				{/* <PDFViewer width="100%" height="100%" showToolbar> */}
				{/*	<Document /> */}
				{/* </PDFViewer> */}
			</CustomModal>
		</Stack>
	);
}

export default PayToClinicDoctor;
