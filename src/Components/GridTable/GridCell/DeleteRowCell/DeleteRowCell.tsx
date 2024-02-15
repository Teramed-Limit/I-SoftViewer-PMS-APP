import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';

interface Props extends ICellRendererParams {
	onClick: (cellRendererParams: ICellRendererParams) => void;
}

function DeleteRowCell(props: Props) {
	return (
		<IconButton size="small" color="error" onClick={() => props.onClick(props)}>
			<ClearIcon />
		</IconButton>
	);
}

export default DeleteRowCell;
