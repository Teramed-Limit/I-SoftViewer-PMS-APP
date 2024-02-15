import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
	palette: {
		mode: 'light',
	},
	typography: {
		fontFamily: '"Plus Jakarta Sans", sans-serif',
	},
	components: {
		MuiInput: {
			defaultProps: {
				size: 'small',
			},
		},
		MuiTextField: {
			defaultProps: {
				size: 'small',
			},
			styleOverrides: {
				root: {
					'& input + fieldset': {
						borderWidth: 2,
					},
					'& fieldset': {
						borderWidth: 2,
					},
					'& input:focus + fieldset': {
						borderLeftWidth: '6px !important',
						padding: '4px !important',
					},
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableTouchRipple: true,
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				size: 'small',
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
				containedPrimary: {
					color: '#fff',
				},
			},
		},
		MuiTab: {
			defaultProps: {
				disableTouchRipple: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontSize: 'large',
				},
			},
		},
	},
});
