import React, { useState } from 'react';
import {
	Drawer,
	SwipeableDrawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	IconButton,
	Box,
	Typography,
	Avatar,
	useMediaQuery,
	useTheme,
	Collapse,
} from '@mui/material';
import {
	Dashboard as DashboardIcon,
	Analytics as AnalyticsIcon,
	People as PeopleIcon,
	Settings as SettingsIcon,
	Palette as PaletteIcon,
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	ExpandLess,
	ExpandMore,
} from '@mui/icons-material';
import { useNavbar } from '../navbar/NavbarContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationItem {
	id: string;
	title: string;
	icon: React.ReactNode;
	url?: string;
	children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		icon: <DashboardIcon />,
		url: '/',
	},
	{
		id: 'analytics',
		title: 'Analytics',
		icon: <AnalyticsIcon />,
		url: '/analytics',
	},
	{
		id: 'users',
		title: 'Users',
		icon: <PeopleIcon />,
		url: '/users',
	},
	{
		id: 'design-system',
		title: 'Design System',
		icon: <PaletteIcon />,
		url: '/design-system-demo',
	},
	{
		id: 'settings',
		title: 'Settings',
		icon: <SettingsIcon />,
		url: '/settings',
	},
];

const DRAWER_WIDTH = 280;
const MINI_DRAWER_WIDTH = 64;

interface MaterialNavbarProps {
	className?: string;
}

const MaterialNavbar: React.FC<MaterialNavbarProps> = ({ className }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	const { navbar, navbarToggle, navbarToggleMobile, navbarCloseMobile } = useNavbar();
	const location = useLocation();
	const navigate = useNavigate();

	const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

	// iOS detection for swipeable drawer optimization
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const handleItemClick = (item: NavigationItem) => {
		if (item.children) {
			setExpandedItems((prev) => {
				const newSet = new Set(prev);

				if (newSet.has(item.id)) {
					newSet.delete(item.id);
				} else {
					newSet.add(item.id);
				}

				return newSet;
			});
		} else if (item.url) {
			navigate(item.url);

			if (isMobile) {
				navbarCloseMobile();
			}
		}
	};

	const isActiveRoute = (url?: string) => {
		if (!url) return false;

		return location.pathname === url || (url !== '/' && location.pathname.startsWith(url));
	};

	const renderNavigationItem = (item: NavigationItem, level = 0) => {
		const isExpanded = expandedItems.has(item.id);
		const isActive = isActiveRoute(item.url);
		const hasChildren = item.children && item.children.length > 0;

		return (
			<React.Fragment key={item.id}>
				<ListItem disablePadding sx={{ display: 'block' }}>
					<ListItemButton
						onClick={() => handleItemClick(item)}
						sx={{
							minHeight: 48,
							justifyContent: !isMobile && !navbar.open ? 'center' : 'initial',
							px: 2.5,
							py: 1,
							ml: level * 2,
							backgroundColor: isActive ? theme.palette.primary.main + '12' : 'transparent',
							color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
							'&:hover': {
								backgroundColor: isActive ? theme.palette.primary.main + '20' : theme.palette.action.hover,
							},
							borderRadius: '8px',
							mx: 1,
							mb: 0.5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: !isMobile && !navbar.open ? 'auto' : 3,
								justifyContent: 'center',
								color: isActive ? theme.palette.primary.main : 'inherit',
							}}
						>
							{item.icon}
						</ListItemIcon>

						{(isMobile || navbar.open) && (
							<>
								<ListItemText
									primary={item.title}
									sx={{
										opacity: 1,
										'& .MuiListItemText-primary': {
											fontSize: '0.875rem',
											fontWeight: isActive ? 600 : 400,
										},
									}}
								/>
								{hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
							</>
						)}
					</ListItemButton>
				</ListItem>

				{/* Render children if expanded */}
				{hasChildren && (isMobile || navbar.open) && (
					<Collapse in={isExpanded} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{item.children?.map((child) => renderNavigationItem(child, level + 1))}
						</List>
					</Collapse>
				)}
			</React.Fragment>
		);
	};

	const drawerContent = (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			{/* Header */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					px: 2,
					py: 2,
					borderBottom: `1px solid ${theme.palette.divider}`,
					minHeight: 64,
				}}
			>
				{(isMobile || navbar.open) && (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Avatar
							sx={{
								width: 32,
								height: 32,
								backgroundColor: theme.palette.primary.main,
								fontSize: '1rem',
								fontWeight: 'bold',
							}}
						>
							F
						</Avatar>
						<Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
							Fuse
						</Typography>
					</Box>
				)}

				{!isMobile && (
					<IconButton
						onClick={navbarToggle}
						sx={{
							ml: navbar.open ? 'auto' : 0,
							mx: navbar.open ? 0 : 'auto',
						}}
					>
						{navbar.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				)}
			</Box>

			{/* Navigation */}
			<Box sx={{ flexGrow: 1, overflow: 'auto', py: 1 }}>
				<List>{navigationItems.map((item) => renderNavigationItem(item))}</List>
			</Box>

			{/* Footer */}
			<Box
				sx={{
					borderTop: `1px solid ${theme.palette.divider}`,
					p: 2,
				}}
			>
				{isMobile || navbar.open ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
						<Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
						<Box sx={{ flexGrow: 1, minWidth: 0 }}>
							<Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
								John Doe
							</Typography>
							<Typography variant="caption" color="text.secondary" noWrap>
								john@example.com
							</Typography>
						</Box>
					</Box>
				) : (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
					</Box>
				)}
			</Box>
		</Box>
	);

	if (isMobile) {
		return (
			<SwipeableDrawer
				anchor="left"
				open={navbar.mobileOpen}
				onClose={navbarCloseMobile}
				onOpen={() => {}} // Not needed for mobile
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile
				}}
				sx={{
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: DRAWER_WIDTH,
						borderRight: 'none',
						boxShadow: theme.shadows[8],
					},
				}}
			>
				{drawerContent}
			</SwipeableDrawer>
		);
	}

	return (
		<Drawer
			variant="permanent"
			open={navbar.open}
			sx={{
				width: navbar.open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
				flexShrink: 0,
				whiteSpace: 'nowrap',
				'& .MuiDrawer-paper': {
					width: navbar.open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
					transition: theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.enteringScreen,
					}),
					overflowX: 'hidden',
					borderRight: `1px solid ${theme.palette.divider}`,
					boxShadow: 'none',
				},
			}}
		>
			{drawerContent}
		</Drawer>
	);
};

export default MaterialNavbar;
