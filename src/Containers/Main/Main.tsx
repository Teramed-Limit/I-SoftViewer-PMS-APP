import * as React from 'react';
import { useEffect } from 'react';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { alpha, MenuItem, Select } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import WithElementVisibility from '../../HOC/WithElementVisiblity/WithElementVisibility.tsx';
import { SiteEntity } from '../../interface/site';
import { atomCodeList } from '../../recoil/atoms/codeList.ts';
import { atomSite } from '../../recoil/atoms/site';
import CodeListService from '../../services/CodeListService.ts';
import EnvService from '../../services/EnvService.ts';
import { http } from '../../utils/api/api';

const routeConfig = [
	{
		name: 'Booking',
		path: 'booking',
		icon: <PendingActionsIcon />,
	},
	{
		name: 'Registration',
		path: 'registration',
		icon: <HowToRegIcon />,
	},
	{
		name: 'Study Query',
		path: 'study-query',
		icon: <SearchIcon />,
	},
	{
		name: 'Accounting',
		path: 'accounting',
		icon: <AccountBalanceIcon />,
		correspondId: 'navigation__accounting',
	},
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	backgroundImage: `linear-gradient(to top left,#0084e7,#003b68)`,
	// backgroundImage: `linear-gradient(to top left,${theme.palette.primary},#003b68)`,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	height: '100%',
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	borderRight: '1px solid rgba(0, 0, 0, 0.1)',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

// const Search = styled('div')(({ theme }) => ({
// 	position: 'relative',
// 	borderRadius: theme.shape.borderRadius,
// 	backgroundColor: alpha(theme.palette.common.white, 0.15),
// 	'&:hover': {
// 		backgroundColor: alpha(theme.palette.common.white, 0.25),
// 	},
// 	marginRight: theme.spacing(2),
// 	marginLeft: 0,
// 	width: '100%',
// 	[theme.breakpoints.up('sm')]: {
// 		marginLeft: theme.spacing(3),
// 		width: 'auto',
// 	},
// }));
//
// const SearchIconWrapper = styled('div')(({ theme }) => ({
// 	padding: theme.spacing(0, 2),
// 	height: '100%',
// 	position: 'absolute',
// 	pointerEvents: 'none',
// 	display: 'flex',
// 	alignItems: 'center',
// 	justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
// 	color: 'inherit',
// 	'& .MuiInputBase-input': {
// 		padding: theme.spacing(1, 1, 1, 0),
// 		// vertical padding + font size from searchIcon
// 		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// 		transition: theme.transitions.create('width'),
// 		width: '100%',
// 		[theme.breakpoints.up('md')]: {
// 			width: '20ch',
// 		},
// 	},
// }));

// Styled component for Select input with Material UI styles
const StyledSelectBase = styled(Select)(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
	padding: 0,
	color: 'inherit',
	'& .MuiInputBase-input': {
		// padding: theme.spacing(1, 1, 1, 1),
		// padding: 64,
		// vertical padding + font size from searchIcon
		// paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	'& .MuiSelect-select': {
		padding: theme.spacing(1, 1, 1, 1),
		// paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

function Main() {
	const navigate = useNavigate();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const [siteList, setSiteList] = React.useState<SiteEntity[]>([]);
	const [site, setSite] = useRecoilState(atomSite);
	const setCodeListMap = useSetRecoilState(atomCodeList);

	useEffect(() => {
		http.get<SiteEntity[]>('/site').subscribe((response) => {
			setSiteList(response);
			setSite(response[0]);
			CodeListService.addCodeList('site', response);
			setCodeListMap((oldCodeListMap) => ({
				...oldCodeListMap,
				site: response,
			}));
		});
	}, [setCodeListMap, setSite]);

	const onChangeSite = (event) => {
		const selectedSite = siteList.find((item) => item.siteId === event.target.value);
		if (!selectedSite) return;
		setSite(selectedSite);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const navigateToPage = (path: string) => {
		navigate(path);
	};

	const onLogout = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		navigate('/login');
	};

	const onOpenERS = () => {
		window.open(EnvService.getERSUrl(), '_blank');
	};

	const json = localStorage.getItem('userInfo');
	const userInfo = json ? (JSON.parse(json) as UserInfo) : undefined;

	return (
		<Box sx={{ display: 'flex', backgroundColor: '#F9F9F9' }}>
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Management System
					</Typography>
					{siteList.length > 0 && (
						<StyledSelectBase value={site.siteId} onChange={(e) => onChangeSite(e)}>
							{siteList.map((item) => (
								<MenuItem key={item.siteId} value={item.siteId}>
									{item.siteName}
								</MenuItem>
							))}
						</StyledSelectBase>
					)}

					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<WithElementVisibility
							wrappedComp={
								<IconButton
									id="navigation__setting"
									size="large"
									color="inherit"
									onClick={() => navigate('settings')}
								>
									<SettingsIcon />
								</IconButton>
							}
						/>
						<IconButton size="large" color="inherit">
							<AccountCircle />
						</IconButton>
						<IconButton size="large" color="inherit" onClick={() => onOpenERS()}>
							<HistoryEduIcon />
						</IconButton>
						<IconButton size="large" edge="end" color="inherit" onClick={() => onLogout()}>
							<LogoutIcon />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton size="large" color="inherit">
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List sx={{ height: '100%' }}>
					{routeConfig.map((route) => {
						if (route.correspondId) {
							const found = userInfo?.functionList.find(
								(roleFunction) => roleFunction.correspondElementId === route.correspondId,
							);

							if (!found) return null;
						}
						return (
							<ListItem key={route.name} disablePadding sx={{ display: 'block' }}>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
									onClick={() => navigateToPage(route.path)}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										{route.icon}
									</ListItemIcon>
									<ListItemText primary={route.name} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
				<Divider />
			</Drawer>
			<Box component="main" sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
				<DrawerHeader id="drawerHeader" sx={{ height: '64px' }} />
				<Box
					sx={{
						display: 'flex',
						flex: '1 1 auto',
						p: 1,
						overflow: 'auto',
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}

export default Main;
