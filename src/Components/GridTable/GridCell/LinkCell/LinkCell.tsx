import { Link } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';

interface Props extends ICellRendererParams {
	onClick: (...params) => void;
}

function LinkCell(props: Props) {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<Link
			sx={{ color: '#256fc7', textDecorationColor: '#256fc7', textDecoration: 'underline' }}
			component="button"
			variant="body2"
			onClick={(event) => {
				event.stopPropagation();
				props?.onClick(props);
			}}
		>
			{props.value}
		</Link>
	);
}

export default LinkCell;
