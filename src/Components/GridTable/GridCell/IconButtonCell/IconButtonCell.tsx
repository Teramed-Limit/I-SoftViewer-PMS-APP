import { IconButton } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';

interface Props extends ICellRendererParams {
	onClick: (...params: any) => void;
	icon: JSX.Element;
	color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

function IconButtonCell(props: Props) {
	return (
		<IconButton
			color={props.color}
			component="span"
			onClick={() => props.onClick(props.data, 'update')}
			disabled={props.data.editable === undefined ? false : !props.data.editable}
		>
			{props.icon}
		</IconButton>
	);
}

export default IconButtonCell;
