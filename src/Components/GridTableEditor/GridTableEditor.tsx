import { useRef, useState } from 'react';

import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { ColDef, GetRowIdParams, ICellRendererParams } from 'ag-grid-community';
import { GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community/dist/lib/events';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import * as R from 'ramda';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import useHttpRequest from '../../hooks/useHttpRequest';
import { useModal } from '../../hooks/useModal';
import { FormEditorDef, FormField, FormSection } from '../../interface/form-editor/form-editor-define';
import { MessageType } from '../../interface/notification.ts';
import { OperationType } from '../../interface/operation-type';
import { atomNotification } from '../../recoil/atoms/notification.ts';
import CustomModal from '../CustomModal/CustomModal';
import FormEditorV2 from '../FormEditorV2/FormEditorV2';
import GridTable from '../GridTable/GridTable';

interface Props<T> {
	// domLayout?: 'normal' | 'autoHeight' | 'print';
	apiPath: string;
	identityId: string;
	columnDefs: ColDef[];
	formDef: FormEditorDef;
	initFormData: T;
	rowData: any[];
	rowSelection?: 'single' | 'multiple';
	canAddRow?: boolean;
	addCallBack?: () => void;
	updateCallBack?: () => void;
	deleteCallBack?: () => void;
	onSelectionChanged?: (event: SelectionChangedEvent<T>) => void;
	children?: React.ReactNode;
}

const gridDeleteActionButton = (onClick: (cellRendererParams: ICellRendererParams) => void): ColDef[] => [
	{
		field: 'deleteActionCell',
		headerName: '',
		width: 40,
		cellStyle: { padding: 0 },
		cellRenderer: 'deleteActionCell',
		cellRendererParams: {
			onClick,
		},
	},
];

const gridEditActionButton = (onClick: (cellRendererParams: ICellRendererParams) => void): ColDef[] => [
	{
		field: 'editActionCell',
		headerName: '',
		width: 40,
		cellStyle: { padding: 0 },
		cellRenderer: 'editActionCell',
		cellRendererParams: {
			onClick,
		},
	},
];

function GridTableEditor<T>({
	apiPath,
	identityId,
	initFormData,
	rowData,
	columnDefs,
	formDef,
	rowSelection,
	canAddRow = true,
	addCallBack,
	updateCallBack,
	deleteCallBack,
	onSelectionChanged,
	children,
}: Props<T>) {
	const setNotification = useSetRecoilState(atomNotification);
	const { sendRequest } = useHttpRequest<any>(); // 指定泛型參數為預期的響應類型
	const { open, setOpen, onModalClose } = useModal({});

	// 表單處理
	const methods = useForm<any>({
		defaultValues: initFormData,
	});
	const [operationType, setOperationType] = useState(OperationType.Insert);

	const gridApi = useRef<GridApi | null>(null);
	const gridReady = (params: GridReadyEvent) => (gridApi.current = params.api);

	const getRowNodeId = (params: GetRowIdParams) => {
		return params.data[identityId];
	};

	// CRUD
	const onAddRow = () => {
		setOperationType(OperationType.Insert);
		methods.reset(initFormData);
		setOpen(true);
	};

	const onUpdateRow = (cellRendererParams: ICellRendererParams) => {
		setOperationType(OperationType.Update);
		methods.reset(cellRendererParams.data);
		setOpen(true);
	};

	const onDeleteRow = (cellRendererParams: ICellRendererParams) => {
		gridApi?.current?.showLoadingOverlay();
		sendRequest({
			url: `/${apiPath}/${cellRendererParams.data[identityId]}`, // API路徑
			method: 'del', // 請求方法
			onSuccess: () => {
				gridApi?.current?.applyTransaction({ remove: [cellRendererParams.data] });
				deleteCallBack?.();
				gridApi?.current?.hideOverlay();
			},
			onError: () => {
				gridApi?.current?.hideOverlay();
			},
		});
	};

	const onFormDataChanged = (data: any) => {
		gridApi?.current?.showLoadingOverlay();

		switch (operationType) {
			case OperationType.Insert: {
				// 先確認是否有重複的Key，如果有的話，就不新增
				const isDuplicate = rowData.some((row) => row[identityId] === data[identityId]);
				if (isDuplicate) {
					gridApi?.current?.hideOverlay();
					setNotification({
						message: 'Duplicate data, Please use update instead.',
						messageType: MessageType.Error,
					});
					return;
				}
				// 處理新增邏輯
				sendRequest({
					url: `/${apiPath}`, // API路徑
					body: data,
					method: 'post', // 請求方法
					onSuccess: (insertedData: any) => {
						// 有些Table是自己產生的Key，GUID或者是自動遞增的數字，這時候要把後端回傳的資料更新到前端
						if (insertedData) {
							gridApi?.current?.applyTransaction({ add: [insertedData], addIndex: 0 });
						}
						// 沒有的話，直接把前端的資料更新到前端
						else {
							gridApi?.current?.applyTransaction({ add: [data], addIndex: 0 });
						}
						addCallBack?.();
					},
				});
				break;
			}
			case OperationType.Update: {
				// 處理更新邏輯
				sendRequest({
					url: `/${apiPath}/${data[identityId]}`, // API路徑
					body: data,
					method: 'put', // 請求方法
					onSuccess: () => {
						gridApi?.current?.applyTransaction({ update: [data] });
						updateCallBack?.();
					},
				});
				break;
			}
			default:
				break;
		}

		// gridApi?.current?.refreshCells({ force: true, rowNodes: [rowNode] });
		gridApi?.current?.hideOverlay();
		onModalClose();
	};

	let mutateColDef: ColDef[] = [...columnDefs];
	mutateColDef = [...gridEditActionButton(onUpdateRow), ...mutateColDef];
	mutateColDef = [...gridDeleteActionButton(onDeleteRow), ...mutateColDef];
	const updateFieldsInSection = (section: FormSection): FormSection =>
		R.evolve(
			{
				// 更新部分內的 'fields' 属性
				fields: (fields: FormField[]) =>
					fields.map((field) => ({
						...field,
						// 如果 'isKey' 為真，則將 'readOnly' 設置為真
						readOnly: field.isKey ? true : field.readOnly,
					})),
			},
			section,
		);

	const updateFormEditorDef = (formEditorDef: FormEditorDef): FormEditorDef =>
		R.evolve(
			{
				// 在表單定義中更新 'sections' 属性
				sections: (sections) => sections.map(updateFieldsInSection),
			},
			formEditorDef,
		);

	// 如果是更新操作，則將 'isKey' 屬性設置為 'readOnly'
	const mutateFormDef =
		operationType === OperationType.Update ? updateFormEditorDef(formDef) : (formDef as FormEditorDef);

	return (
		<>
			<Stack sx={{ flex: '1 1 auto', width: '100%' }} direction="column">
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Button disabled={!canAddRow} variant="text" onClick={() => onAddRow()}>
						Add Row
					</Button>
					{children}
				</Box>
				<div style={{ flex: '1 1 auto', width: '100%' }} id="grid1" className="ag-theme-quartz">
					<GridTable<T>
						gridReady={gridReady}
						getRowId={getRowNodeId}
						rowSelection={rowSelection}
						columnDefs={mutateColDef}
						rowData={rowData}
						onSelectionChanged={onSelectionChanged}
					/>
				</div>
			</Stack>
			<CustomModal
				width="20%"
				label=""
				open={open}
				onModalClose={() => {
					onModalClose();
					methods.reset(initFormData);
				}}
			>
				<FormProvider {...methods}>
					<FormEditorV2 formDef={mutateFormDef} formDataChanged={onFormDataChanged}>
						<Button type="submit" variant="contained" color="primary">
							Save
						</Button>
					</FormEditorV2>
				</FormProvider>
			</CustomModal>
		</>
	);
}

export default GridTableEditor;
