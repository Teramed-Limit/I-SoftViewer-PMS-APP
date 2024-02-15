import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';

interface Props extends ICellRendererParams {
	onClick: (cellRendererParams: ICellRendererParams) => void;
}

function EditRowCell(props: Props) {
	return (
		<IconButton size="small" color="primary" onClick={() => props.onClick(props)}>
			<EditIcon />
		</IconButton>
	);
}

export default EditRowCell;
