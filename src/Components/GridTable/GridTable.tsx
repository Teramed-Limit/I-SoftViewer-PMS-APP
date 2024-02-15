import { useRef } from 'react';

// Import necessary styles
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './gridStyle.css';

// Import AG Grid types
import { ColDef, FilterChangedEvent } from 'ag-grid-community';
import { GetRowIdFunc } from 'ag-grid-community/dist/lib/entities/gridOptions';
import {
	FirstDataRenderedEvent,
	GridReadyEvent,
	RowSelectedEvent,
	SelectionChangedEvent,
} from 'ag-grid-community/dist/lib/events';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import { AgGridReact } from 'ag-grid-react';

// Import custom cell mapper
import { CellMapper } from './GridCell/cell-mapper';

// Define props interface with generics
interface TableProps<T> {
	domLayout?: 'normal' | 'autoHeight' | 'print';
	columnDefs: ColDef[];
	rowData: T[]; // Use generic type for rowData
	rowHeight?: number;
	onSelectionChanged?: (event: SelectionChangedEvent<T>) => void;
	onFirstDataRendered?: (event: FirstDataRenderedEvent<T>) => void;
	onRowSelected?: (event: RowSelectedEvent<T>) => void;
	rowSelection?: 'single' | 'multiple';
	checkboxSelect?: boolean;
	gridReady?: (gridReadyEvent: GridReadyEvent<T>) => void;
	getRowId?: GetRowIdFunc<T>;
	isFilterActivate?: () => boolean;
	onFilterChanged?: (event: FilterChangedEvent<T>) => void;
}

// Define generic GridTable component
function GridTable<T>({
	domLayout = 'normal',
	rowHeight,
	columnDefs,
	rowData,
	onSelectionChanged,
	onFirstDataRendered,
	onRowSelected,
	checkboxSelect,
	rowSelection = 'multiple',
	gridReady,
	getRowId,
	isFilterActivate,
	onFilterChanged,
}: TableProps<T>) {
	const gridApi = useRef<GridApi | null>(null);

	// Callback for when grid is ready
	const onGridReady = (params: GridReadyEvent) => {
		gridApi.current = params.api;
		gridReady?.(params);
	};

	return (
		// Render AG Grid with generic types
		<AgGridReact
			domLayout={domLayout}
			isExternalFilterPresent={isFilterActivate}
			onGridReady={onGridReady}
			rowData={rowData}
			rowHeight={rowHeight}
			defaultColDef={{
				resizable: true,
			}}
			columnDefs={columnDefs}
			rowMultiSelectWithClick={checkboxSelect}
			suppressRowClickSelection={checkboxSelect}
			rowSelection={rowSelection}
			getRowId={getRowId} // Use generic type for getRowNodeId
			components={{ ...CellMapper }}
			tooltipShowDelay={0}
			onFilterChanged={(e) => onFilterChanged?.(e)}
			onRowSelected={(event) => (onRowSelected ? onRowSelected(event) : null)}
			onFirstDataRendered={(event) => (onFirstDataRendered ? onFirstDataRendered(event) : null)}
			onSelectionChanged={(event) => (onSelectionChanged ? onSelectionChanged(event) : null)}
		/>
	);
}

export default GridTable;
