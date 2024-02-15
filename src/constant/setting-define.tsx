import { ColDef, ValueFormatterParams } from 'ag-grid-community';

import SelectionFilterCell from '../Components/GridTable/FilterCell/SelectionFilterCell.tsx';
import { FormEditorDef, FormFieldEditorType } from '../interface/form-editor/form-editor-define';
import EnvService from '../services/EnvService.ts';
import { convertToDate } from '../utils/date-utils.ts';

export const gridDefine = {
	study: {
		colDef: [
			// {
			// 	field: 'status',
			// 	headerName: 'Status',
			// 	pinned: 'left',
			// 	width: 520,
			// 	headerCheckboxSelection: false,
			// 	checkboxSelection: false,
			// 	cellRenderer: 'stepCell',
			// },
			{
				field: 'patientId',
				headerName: 'Patient Id',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'patientName',
				headerName: 'Patient Name',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'studyDate',
				headerName: 'Study Date',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return convertToDate(new Date(params.value), EnvService.getDateFormat());
					}
				},
			},
			{
				field: 'accessionNumber',
				headerName: 'Accession No.',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'modality',
				headerName: 'Modality',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'referringPhysician',
				headerName: 'Referring Physician',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'reportingPhysician',
				headerName: 'Reporting Physician',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'performingPhysician',
				headerName: 'Performing Physician',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'actions',
				headerName: '',
				pinned: 'right',
				width: 420,
				cellRenderer: 'customActionsCell',
				headerCheckboxSelection: false,
				checkboxSelection: false,
			},
			{ field: 'studyInstanceUID', headerName: 'StudyInstanceUID', hide: true },
		] as ColDef[],
	},
	accountingCredit: {
		colDef: [
			{
				field: 'patientId',
				headerName: 'Patient Id',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'patientName',
				headerName: 'Patient Name',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'studyDate',
				headerName: 'Study Date',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 120,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return convertToDate(new Date(params.value), EnvService.getDateFormat());
					}
				},
			},
			{
				field: 'accessionNumber',
				headerName: 'Accession No.',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'modality',
				headerName: 'Modality',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				width: 120,
				floatingFilter: true,
			},
			{
				field: 'referringPhysician',
				headerName: 'Referring Physician',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				floatingFilter: true,
				filter: 'agTextColumnFilter',
				floatingFilterComponent: SelectionFilterCell,
			},
			{
				field: 'reportingPhysician',
				headerName: 'Reporting Physician',
				headerCheckboxSelection: true,
				checkboxSelection: true,
				floatingFilter: true,
				filter: 'agTextColumnFilter',
				floatingFilterComponent: SelectionFilterCell,
				pinned: 'left',
			},
			{
				field: 'performingPhysician',
				headerName: 'Performing Physician',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				floatingFilter: true,
				filter: 'agTextColumnFilter',
				floatingFilterComponent: SelectionFilterCell,
				pinned: 'left',
			},
			{ field: 'studyInstanceUID', headerName: 'StudyInstanceUID', hide: true },
		] as ColDef[],
	},
	accountingInvoice: {
		colDef: [
			{
				field: 'patientId',
				headerName: 'Patient Id',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'patientName',
				headerName: 'Patient Name',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'studyDate',
				headerName: 'Study Date',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 120,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return convertToDate(new Date(params.value), EnvService.getDateFormat());
					}
				},
			},
			{
				field: 'accessionNumber',
				headerName: 'Accession No.',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'modality',
				headerName: 'Modality',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				width: 120,
				floatingFilter: true,
			},
			{
				field: 'payer',
				headerName: 'Payer',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				floatingFilter: true,
				filter: 'agTextColumnFilter',
				floatingFilterComponent: SelectionFilterCell,
				pinned: 'left',
			},
			{ field: 'studyInstanceUID', headerName: 'StudyInstanceUID', hide: true },
		] as ColDef[],
	},
	examItemDetails: {
		colDef: [
			{
				field: 'itemId',
				headerName: 'Item Id',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 100,
			},
			{
				field: 'itemName',
				headerName: 'Item Name',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 600,
			},
			{
				field: 'number',
				headerName: 'Number of Job',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 200,
			},
			{
				field: 'price',
				headerName: 'Price',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 100,
			},
			{
				field: 'total',
				headerName: 'Total',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 100,
			},
			{
				field: 'discount',
				headerName: 'Discount',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 100,
			},
			{
				field: 'netTotal',
				headerName: 'Net Total',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 100,
			},
		] as ColDef[],
	},
	payslipDetails: {
		colDef: [
			{
				field: 'itemId',
				headerName: 'Item Id',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				hide: true,
			},
			{
				field: 'itemName',
				headerName: 'Item Name',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 600,
			},
			{
				field: 'price',
				headerName: 'Unit Price',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 100,
			},
			{
				field: 'number',
				headerName: 'Quantity',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 200,
			},
			{
				field: 'total',
				headerName: 'Sub Total',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				width: 100,
			},
		] as ColDef[],
	},
	accountingBill: {
		colDef: [
			{
				field: 'patientId',
				headerName: 'Patient Id',
				headerCheckboxSelection: true,
				checkboxSelection: true,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'patientName',
				headerName: 'Patient Name',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'studyDate',
				headerName: 'Study Date',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return convertToDate(new Date(params.value), EnvService.getDateFormat());
					}
				},
			},
			{
				field: 'accessionNumber',
				headerName: 'Accession No.',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'modality',
				headerName: 'Modality',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{
				field: 'payer',
				headerName: 'Payer',
				headerCheckboxSelection: false,
				checkboxSelection: false,
				filter: 'agTextColumnFilter',
				floatingFilter: true,
			},
			{ field: 'studyInstanceUID', headerName: 'StudyInstanceUID', hide: true },
		] as ColDef[],
	},
	codeList: {
		colDef: [
			{
				field: 'id',
				width: 300,
				hide: true,
			},
			{
				field: 'label',
				headerName: 'Label',
				width: 300,
			},
			{
				field: 'value',
				headerName: 'Value',
				width: 300,
			},
			{
				field: 'codeName',
				headerName: 'Code Name',
				width: 200,
			},
			{
				field: 'parentCodeValue',
				headerName: 'Parent Code Value',
				width: 200,
			},
			{
				field: 'orderingIndex',
				headerName: 'Ordering',
				minWidth: 120,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return +params.value;
					}
				},
			},
		] as ColDef[],
	},
	paymentUnit: {
		colDef: [
			{
				field: 'name',
				headerName: 'Name',
				width: 300,
			},
			{
				field: 'otherName',
				headerName: 'Other Name',
				width: 300,
			},
			{
				field: 'paymentType',
				headerName: 'Payment Type',
				width: 300,
			},
			{
				field: 'address',
				headerName: 'Address',
				width: 300,
				flex: 1,
			},
			{
				field: 'contact',
				headerName: 'Contact',
				width: 200,
			},
			{
				field: 'refNo',
				headerName: 'RefNo',
				width: 200,
			},
		] as ColDef[],
	},
	payer: {
		colDef: [
			{
				field: 'payerId',
				headerName: 'PayerId',
				width: 300,
				hide: true,
			},
			{
				field: 'name',
				headerName: 'Name',
				width: 300,
			},
			{
				field: 'otherName',
				headerName: 'OtherName',
				width: 300,
			},
			{
				field: 'discount',
				headerName: 'Discount',
				width: 200,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return +params.value;
					}
				},
			},
			{
				field: 'paymentUnitName',
				headerName: 'Payment Unit',
				width: 200,
			},
		] as ColDef[],
	},
	examItem: {
		colDef: [
			{
				field: 'itemId',
				headerName: 'Item Id',
				width: 100,
			},
			{
				field: 'itemName',
				headerName: 'Item Name',
				width: 300,
				flex: 1,
			},
			{
				field: 'price',
				headerName: 'Price',
				width: 200,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return +params.value;
					}
				},
			},
			{
				field: 'number',
				headerName: 'Number of Jobs',
				width: 200,
				valueFormatter: (params: ValueFormatterParams) => {
					if (params?.value) {
						return +params.value;
					}
				},
			},
			{
				field: 'modality',
				headerName: 'Modality',
				width: 200,
			},
			{
				field: 'siteId',
				headerName: 'Site Id',
				width: 200,
				hide: true,
			},
		] as ColDef[],
	},
};

export const define = {
	booking: {
		direction: 'column',
		sections: [
			{
				id: 'form',
				label: '',
				direction: 'column',
				flex: '1 1 auto',
				fields: [
					{ id: 'bookId', label: 'book Id', type: 'Text', hide: true },
					{
						id: 'patientId',
						label: 'HK ID',
						type: 'AutoCompleteText',
						validate: { required: 'Field is required' },
						url: '/registration/query/history',
						autoCompleteFields: {
							patientName: 'string',
							patientCHName: 'string',
							patientSex: 'string',
							contactPhone: 'string',
						},
					},
					{
						id: 'patientName',
						label: 'Patient Name',
						type: 'Text',
						validate: { required: 'Field is required' },
					},
					{
						id: 'patientSex',
						label: 'Sex',
						type: 'SingleSelect',
						optionSource: {
							type: 'static',
							source: 'sex',
							key: 'value',
							labelKey: 'label',
						},
					},
					{
						id: 'modality',
						label: 'Exam Type',
						type: 'SingleSelect',
						optionSource: {
							type: 'static',
							source: 'modality',
							key: 'value',
							labelKey: 'label',
						},
						validate: { required: 'Field is required' },
					},
					{
						id: 'contactPhone',
						label: 'Contact phone',
						type: 'AutoCompleteText',
						validate: { required: 'Field is required' },
						url: '/registration/query/history',
						autoCompleteFields: {
							patientId: 'string',
							patientName: 'string',
							patientCHName: 'string',
							patientSex: 'string',
						},
					},
					{
						id: 'referringPhysician',
						label: 'Referring Physician',
						type: 'AutoCompleteSelect',
						optionSource: {
							type: 'customHttp',
							source: '/paymentUnit/query?filter=PaymentType=referringPhysician',
							key: 'name',
							labelKey: 'name',
						},
					},
					{
						id: 'remark',
						label: 'Remark',
						type: 'Text',
					},
					{
						id: 'startDatetime',
						label: 'Start Date',
						type: 'Text',
						hide: true,
					},
					{
						id: 'endDatetime',
						label: 'End Date',
						type: 'Text',
						hide: true,
					},
				],
			},
		],
	} as FormEditorDef,
	register_patient: {
		direction: 'column',
		eachFieldWidth: '13%',
		sections: [
			{
				id: 'patient',
				label: 'Patient Information',
				direction: 'row',
				flex: '1 1 auto',
				fields: [
					{ id: 'bookId', label: 'book Id', type: 'Text', hide: true },
					{
						id: 'patientId',
						label: 'HK ID',
						type: 'AutoCompleteText',
						validate: { required: 'Field is required' },
						url: '/registration/query/history',
						autoCompleteFields: {
							patientName: 'string',
							patientCHName: 'string',
							patientSex: 'string',
							contactPhone: 'string',
							patientDOB: 'date',
							patientAge: 'number',
						},
					},
					{
						id: 'patientName',
						label: 'Patient Name',
						type: 'Text',
						validate: { required: 'Field is required' },
					},
					{
						id: 'patientCHName',
						label: 'Patient CH Name',
						type: 'Text',
						// validate: { required: 'Field is required' },
					},
					{
						id: 'patientSex',
						label: 'Sex',
						type: 'SingleSelect',
						optionSource: {
							type: 'static',
							source: 'sex',
							key: 'value',
							labelKey: 'label',
						},
					},
					{
						id: 'contactPhone',
						label: 'Contact Phone',
						type: 'AutoCompleteText',
						validate: { required: 'Field is required' },
						url: '/registration/query/history',
						autoCompleteFields: {
							patientId: 'string',
							patientName: 'string',
							patientCHName: 'string',
							patientSex: 'string',
							patientDOB: 'date',
							patientAge: 'number',
						},
					},
					{
						id: 'patientDOB',
						label: 'Date of Birth',
						type: 'Date',
						validate: { required: 'Field is required' },
						dependentFieldId: 'patientAge',
						calculateMethod: 'dobToAge',
					},
					{
						id: 'patientAge',
						readOnly: true,
						label: 'Age',
						type: 'Text',
					},
				],
			},
			{
				id: 'study',
				label: 'Study Information',
				direction: 'row',
				flex: '1 1 auto',
				fields: [
					{
						id: 'examNumber',
						label: 'Exam No.',
						type: 'Text',
						readOnly: true,
						validate: { required: 'Field is required' },
					},
					{
						id: 'accessionNumber',
						label: 'Accession Number',
						type: 'Text',
						readOnly: true,
						validate: { required: 'Field is required' },
					},
					{
						id: 'studyDate',
						label: 'Study Date',
						type: 'Date',
					},
					{
						id: 'modality',
						label: 'Exam Type',
						type: 'SingleSelect',
						validate: { required: 'Field is required' },
						optionSource: {
							type: 'static',
							source: 'modality',
							key: 'value',
							labelKey: 'label',
						},
					},
					{
						id: 'studyDescription',
						label: 'Study Description',
						type: 'Text',
					},
					{
						id: 'referringPhysician',
						label: 'Referring Physician',
						type: 'AutoCompleteSelect',
						optionSource: {
							type: 'customHttp',
							source: '/paymentUnit/query?filter=PaymentType=referringPhysician',
							key: 'name',
							labelKey: 'name',
						},
					},
					{
						id: 'referringPhysicianNumber',
						label: 'Referring Physician No.',
						type: 'Text',
					},
				],
			},
			{
				id: 'doctor',
				label: 'Assignee',
				direction: 'row',
				flex: '1 1 auto',
				fields: [
					{
						id: 'reportingPhysician',
						label: 'Reporting Physician',
						type: 'AutoCompleteSelect',
						optionSource: {
							type: 'customHttp',
							source: '/account/codeList?joinText=Title^DoctorEName&filter=Title=Dr.',
							key: 'value',
							labelKey: 'label',
						},
					},
					{
						id: 'performingPhysician',
						label: 'Performing Physician',
						type: 'AutoCompleteSelect',
						optionSource: {
							type: 'customHttp',
							source: '/account/codeList?joinText=Title^DoctorEName&filter=Title=Sonographer',
							key: 'value',
							labelKey: 'label',
						},
					},
				],
			},
		],
	} as FormEditorDef,
	codeList: {
		direction: 'column',
		sections: [
			{
				id: 'codeList',
				label: 'CodeList',
				direction: 'column',
				flex: '1 1 auto',
				fields: [
					{
						id: 'id',
						label: 'Id',
						type: FormFieldEditorType.Text,
						hide: true,
					},
					{
						id: 'label',
						label: 'Label',
						type: FormFieldEditorType.Text,
						validate: { required: 'Field is required' },
					},
					{
						id: 'value',
						label: 'Value',
						type: FormFieldEditorType.Text,
						validate: { required: 'Field is required' },
					},
					{
						id: 'codeName',
						label: 'Code Name',
						readOnly: true,
						type: FormFieldEditorType.Text,

						validate: { required: 'Field is required' },
					},
					{
						id: 'parentCodeValue',
						label: 'Parent Code Value',
						type: FormFieldEditorType.Text,
					},
					{
						id: 'orderingIndex',
						label: 'Ordering',
						type: FormFieldEditorType.Number,
						validate: { required: 'Field is required' },
					},
				],
			},
		],
	} as FormEditorDef,
	paymentUnit: {
		direction: 'column',
		sections: [
			{
				id: 'paymentUnit',
				label: 'Payment Unit',
				direction: 'column',
				flex: '1 1 auto',
				fields: [
					{
						id: 'name',
						label: 'Name',
						type: FormFieldEditorType.Text,
						validate: { required: 'Field is required' },
						isKey: true,
					},
					{
						id: 'paymentType',
						label: 'Payment Type',
						type: FormFieldEditorType.SingleSelect,
						optionSource: {
							type: 'static',
							source: 'payerType',
							key: 'value',
							labelKey: 'label',
						},
					},
					{
						id: 'address',
						label: 'Address',
						type: FormFieldEditorType.Text,
					},
					{
						id: 'contact',
						label: 'Contact',
						type: FormFieldEditorType.Text,
					},
					{
						id: 'refNo',
						label: 'Ref No',
						type: FormFieldEditorType.Text,
					},
				],
			},
		],
	} as FormEditorDef,
	payer: {
		direction: 'column',
		sections: [
			{
				id: 'payer',
				label: 'Payer',
				direction: 'column',
				flex: '1 1 auto',
				fields: [
					{
						id: 'payerId',
						label: 'payerId',
						type: FormFieldEditorType.Text,
						hide: true,
					},
					{
						id: 'name',
						label: 'Name',
						type: FormFieldEditorType.Text,
						validate: { required: 'Field is required' },
					},
					{
						id: 'otherName',
						label: 'OtherName',
						type: FormFieldEditorType.Text,
					},
					{
						id: 'discount',
						label: 'Discount',
						type: FormFieldEditorType.Number,
					},
					{
						id: 'paymentUnitName',
						label: 'PaymentUnitName',
						type: FormFieldEditorType.Text,
						readOnly: true,
					},
				],
			},
		],
	} as FormEditorDef,
	examItem: {
		direction: 'column',
		sections: [
			{
				id: 'payer',
				label: 'Payer',
				direction: 'column',
				flex: '1 1 auto',
				fields: [
					{
						id: 'itemId',
						label: 'ItemId',
						type: FormFieldEditorType.Text,
						validate: { required: 'Field is required' },
						isKey: true,
					},
					{
						id: 'itemName',
						label: 'ItemName',
						type: FormFieldEditorType.Text,
						validate: { required: 'Field is required' },
					},
					{
						id: 'price',
						label: 'Price',
						type: FormFieldEditorType.Number,
						validate: { required: 'Field is required' },
					},
					{
						id: 'number',
						label: 'Number of Jobs',
						type: FormFieldEditorType.Number,
						validate: { required: 'Field is required' },
					},
					{
						id: 'modality',
						label: 'Modality',
						type: FormFieldEditorType.SingleSelect,
						validate: { required: 'Field is required' },
						optionSource: {
							type: 'static',
							source: 'modality',
							key: 'value',
							labelKey: 'label',
						},
					},
					{
						id: 'siteId',
						label: 'Site Id',
						type: FormFieldEditorType.SingleSelect,
						validate: { required: 'Field is required' },
						optionSource: {
							type: 'customHttp',
							source: '/site',
							key: 'siteId',
							labelKey: 'siteName',
						},
					},
				],
			},
		],
	} as FormEditorDef,
};
