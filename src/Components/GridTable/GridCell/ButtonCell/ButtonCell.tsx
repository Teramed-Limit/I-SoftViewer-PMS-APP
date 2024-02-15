import { Button } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';

interface Props extends ICellRendererParams {
	onClick: (...params: any) => void;
	color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	variant: 'text' | 'outlined' | 'contained';
	label: string;
}

function ButtonCell(props: Props) {
	return (
		<Button
			fullWidth
			sx={{ fontSize: '0.8125rem !important' }}
			variant={props.variant}
			color={props.color}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				props.onClick(props);
			}}
		>
			{props.label}
		</Button>
	);
}

export default ButtonCell;
