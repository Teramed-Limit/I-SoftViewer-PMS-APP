import { Box } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { ICellRendererParams } from 'ag-grid-community';

interface Props extends ICellRendererParams {}

const steps = ['New', 'Scanned', 'Rep. Saved', 'Rep. Signed', 'Rep. Checked'];

function StepperCell(props: Props) {
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
			}}
		>
			<Stepper sx={{ width: props.colDef?.width || '520px' }} activeStep={1} alternativeLabel>
				{steps.map((label) => (
					<Step sx={{ p: 0 }} key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
}

export default StepperCell;
