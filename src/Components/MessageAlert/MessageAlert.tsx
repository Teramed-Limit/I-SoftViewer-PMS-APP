import React, { useEffect, useRef, useState } from 'react';

import { AlertProps, Snackbar, SnackbarOrigin } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useRecoilValue } from 'recoil';

import { atomNotification } from '../../recoil/atoms/notification';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MessageAlert() {
	const [open, setOpen] = useState(false);
	const notification = useRecoilValue(atomNotification);

	const attribute = useRef<SnackbarOrigin>({
		vertical: 'bottom',
		horizontal: 'right',
	});

	useEffect(() => {
		if (notification.message === '') return;
		setOpen(true);
	}, [notification]);

	const { vertical, horizontal } = attribute.current;

	return (
		<Snackbar
			anchorOrigin={{ vertical, horizontal }}
			open={open}
			autoHideDuration={2000}
			onClose={() => setOpen(false)}
		>
			<Alert
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onClose={() => setOpen(false)}
				severity={notification.messageType}
			>
				{notification.message}
			</Alert>
		</Snackbar>
	);
}

export default MessageAlert;
