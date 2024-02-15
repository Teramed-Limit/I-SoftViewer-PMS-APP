import { ICellRendererParams } from 'ag-grid-community';

function CheckboxCell(prop: ICellRendererParams) {
	return <input readOnly type="checkbox" checked={prop.value} />;
}

export default CheckboxCell;
