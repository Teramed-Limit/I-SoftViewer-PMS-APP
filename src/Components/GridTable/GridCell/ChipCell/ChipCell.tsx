import { Box, Chip } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';

interface Props extends ICellRendererParams {
	value: string[];
}

function ChipCell(props: Props) {
	return (
		<>
			{props.value?.map((label) => {
				return (
					<Box key={label} sx={{ mr: '2px', display: 'flex', alignItems: 'center ' }}>
						<Chip label={label} />
					</Box>
				);
			})}
		</>
	);
}

export default ChipCell;
