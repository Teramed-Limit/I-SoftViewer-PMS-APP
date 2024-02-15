import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import { IFilterComp, IFilterParams } from 'ag-grid-community';
import { IRowNode } from 'ag-grid-community/dist/lib/interfaces/iRowNode';

import { isEmptyOrNil } from '../../../utils/general.ts';
import classes from './SelectionFilterCell.module.scss';

const SelectionFilterCell = forwardRef<IFilterComp, IFilterParams>((props, _) => {
	const [options, setOptions] = useState<string[]>([]);

	// 一個函數，用於提取並更新選項
	const updateOptions = useCallback(() => {
		const allRows: string[] = [];
		props.api.forEachNode((node: IRowNode) => {
			const value = node.data[props.column.getColId()];
			if (isEmptyOrNil(value)) return;
			allRows.push(node.data[props.column.getColId()]);
		});
		const uniqueOptions = [...new Set(allRows)];
		setOptions(uniqueOptions);
	}, [props.api, props.column]);

	useEffect(() => {
		updateOptions();
		const onDataUpdated = () => updateOptions(); // 當資料更新時重新提取選項
		props.api.addEventListener('modelUpdated', onDataUpdated);

		return () => {
			props.api.removeEventListener('modelUpdated', onDataUpdated);
		};
	}, [props.api, props.column, updateOptions]);

	const onFilterChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.api.setFilterModel({
			[props.column.getColId()]: {
				type: 'equals',
				filter: event.target.value,
			},
		});
		props.api.onFilterChanged();
	};

	return (
		<Stack sx={{ alignSelf: 'center', width: '100%' }}>
			<select className={classes.textField} style={{}} onChange={onFilterChanged} defaultValue="">
				<option value="">All</option>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</Stack>
	);
});

// 為組件指定顯示名稱
SelectionFilterCell.displayName = 'SelectionFilterCell';

export default SelectionFilterCell;
