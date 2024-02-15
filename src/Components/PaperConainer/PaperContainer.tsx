import React from 'react';

import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

interface Props {
	style?: React.CSSProperties;
	title: string;
	elevation?: number;
	children: React.ReactNode;
}

function PaperContainer({ style, title, elevation = 3, children }: Props) {
	return (
		<Paper style={style} sx={{ padding: 1.5 }} elevation={elevation}>
			{title && (
				<Typography variant="h5" gutterBottom component="div" className="header">
					{title}
				</Typography>
			)}
			{children}
		</Paper>
	);
}

export default PaperContainer;
