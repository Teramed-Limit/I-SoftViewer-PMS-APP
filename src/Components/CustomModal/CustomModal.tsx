import React from 'react';

import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

interface Props {
	label?: string;
	open: boolean;
	keepMounted?: boolean;
	width?: string;
	height?: string;
	onModalClose?: () => void;
	children?: React.ReactNode;
}

const style = {
	position: 'absolute' as const,
	width: 'fit-content',
	height: 'fit-content',
	maxWidth: '95%',
	maxHeight: '95%',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	borderRadius: 4,
	boxShadow: 24,
	p: 2,
};

function CustomModal({
	width = '50%',
	height = 'fit-content',
	label,
	open,
	keepMounted = false,
	onModalClose,
	children,
}: Props) {
	return (
		<Modal keepMounted={keepMounted} open={open} onClose={onModalClose}>
			<Stack sx={{ ...style, width, height }} spacing={2}>
				<Typography variant="h5" component="div">
					{label}
				</Typography>
				{children}
			</Stack>
		</Modal>
	);
}

export default CustomModal;
