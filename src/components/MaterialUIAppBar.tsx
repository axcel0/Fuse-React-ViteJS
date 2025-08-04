import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Menu,
	MenuItem,
	Box,
	useScrollTrigger,
	Slide,
	Avatar,
	Badge,
	Tooltip,
	Divider,
	useTheme,
	alpha,
	Breadcrumbs,
	Link,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	CircularProgress
} from '@mui/material';
import {
	Search as SearchIcon,
	Notifications as NotificationsIcon,
	Settings as SettingsIcon,
	AccountCircle,
	Logout,
	Dashboard,
	Person,
	MoreVert,
	Home,
	ChevronRight
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// Import components yang sudah ada
import { useNavbar } from 'src/components/theme-layouts/components/navbar/NavbarContext';
import NavbarToggleButton from 'src/components/theme-layouts/components/navbar/NavbarToggleButton';
import LightDarkModeToggle from 'src/components/LightDarkModeToggle';
import FullScreenToggle from 'src/components/theme-layouts/components/FullScreenToggle';
import LanguageSwitcher from 'src/components/theme-layouts/components/LanguageSwitcher';
import NavigationShortcuts from 'src/components/theme-layouts/components/navigation/NavigationShortcuts';
import QuickPanelToggleButton from 'src/components/theme-layouts/components/quickPanel/QuickPanelToggleButton';
import useFuseLayoutSettings from '@fuse/core/FuseLayout/useFuseLayoutSettings';
import useUser from '@auth/useUser';
// Hapus import untuk menggunakan Material-UI default theme
// import { useToolbarTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { Layout1ConfigDefaultsType } from '@/components/theme-layouts/layout1/Layout1Config';
import themeOptions from 'src/configs/themeOptions';
import _ from 'lodash';
import { getUserDisplayData } from '@/types/user';

// Simple Material-UI Search Component - No fancy effects, just works
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto'
	}
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	}
}));

// Styled AppBar with black/white theme colors
const StyledAppBar = styled(AppBar)(({ theme }) => ({
	// Menggunakan warna hitam/putih sesuai theme
	backgroundColor:
		theme.palette.mode === 'dark'
			? theme.palette.grey[900] // Hitam untuk dark mode
			: theme.palette.common.white, // Putih untuk light mode
	color:
		theme.palette.mode === 'dark'
			? theme.palette.common.white // Putih text untuk dark mode
			: theme.palette.grey[900], // Hitam text untuk light mode
	boxShadow: theme.shadows[1], // Shadow yang lebih minimal
	borderBottom: `1px solid ${theme.palette.divider}`, // Border untuk definisi yang lebih jelas
	transition: theme.transitions.create(['background-color', 'color'], {
		duration: theme.transitions.duration.short
	})
}));

// Hide on scroll component
interface HideOnScrollProps {
	children: React.ReactElement;
	window?: () => Window;
}

function HideOnScroll(props: HideOnScrollProps) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined
	});

	return (
		<Slide
			appear={false}
			direction="down"
			in={!trigger}
		>
			{children}
		</Slide>
	);
}

// Main component props
interface MaterialUIAppBarProps {
	className?: string;
	hideOnScroll?: boolean;
	position?: 'fixed' | 'static' | 'sticky' | 'absolute' | 'relative';
	elevation?: number;
	variant?: 'dense' | 'regular' | 'prominent';
	enableColorOnDark?: boolean;
	showBreadcrumbs?: boolean;
	showSearch?: boolean;
	showNotifications?: boolean;
	showUserMenu?: boolean;
	// New props for navbar integration
	showNavbarToggle?: boolean;
	navbarPosition?: 'left' | 'right';
	navbarStyle?: string;
}

/**
 * Enhanced Material-UI AppBar with all modern features
 */
function MaterialUIAppBar(props: MaterialUIAppBarProps) {
	const {
		className,
		hideOnScroll = false,
		position = 'static',
		elevation = 1,
		variant = 'regular',
		enableColorOnDark = true,
		showBreadcrumbs = true,
		showSearch = true,
		showNotifications = true,
		showUserMenu = true,
		showNavbarToggle = false,
		navbarPosition = 'left',
		navbarStyle = 'style-1'
	} = props;

	const _theme = useTheme();
	const location = useLocation();
	const navigate = useNavigate();
	const settings = useFuseLayoutSettings();
	const _config = settings.config as Layout1ConfigDefaultsType;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { navbar } = useNavbar();
	const user = useUser();
	
	// Safe access to user data with proper typing using helper function
	const { displayName, email, photoURL, isGuest, initials } = getUserDisplayData(user);
	// Menggunakan Material-UI default theme, tidak perlu custom toolbar theme
	// const toolbarTheme = useToolbarTheme();

	// State management
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
	const [anchorElMore, setAnchorElMore] = useState<null | HTMLElement>(null);
	const [notificationCount, _setNotificationCount] = useState(3);
	const [searchValue, setSearchValue] = useState('');
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	// Get page breadcrumbs from location
	const getBreadcrumbs = () => {
		const pathnames = location.pathname.split('/').filter((x) => x);
		const breadcrumbs = [
			{
				label: 'Home',
				path: '/',
				icon: (
					<Home
						sx={{ mr: 0.5 }}
						fontSize="inherit"
					/>
				)
			}
		];

		pathnames.forEach((value, index) => {
			const path = `/${pathnames.slice(0, index + 1).join('/')}`;
			const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
			breadcrumbs.push({
				label,
				path,
				icon: (
					<ChevronRight
						sx={{ mr: 0.5 }}
						fontSize="inherit"
					/>
				)
			});
		});

		return breadcrumbs;
	};

	// Event handlers
	const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNotifications(event.currentTarget);
	};

	const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElMore(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorElUser(null);
		setAnchorElNotifications(null);
		setAnchorElMore(null);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSearchSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (searchValue.trim()) {
			// TODO: Implement search logic here
			// console.error('Search:', searchValue);
		}
	};

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			if (user?.signOut) {
				await user.signOut();
			}
			// Navigation akan ditangani otomatis oleh AuthProvider
			// Tapi kita bisa menambahkan navigation manual jika diperlukan
			navigate('/sign-out');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setIsLoggingOut(false);
			setLogoutDialogOpen(false);
		}
		handleMenuClose();
	};

	const handleLogoutClick = () => {
		setLogoutDialogOpen(true);
		handleMenuClose();
	};

	const handleLogoutCancel = () => {
		setLogoutDialogOpen(false);
	};

	// Simple Material-UI Search Component
	const SimpleSearch = () => (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ 'aria-label': 'search' }}
				value={searchValue}
				onChange={handleSearchChange}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						handleSearchSubmit(e);
					}
				}}
			/>
		</Search>
	);

	// Toolbar variants
	const getToolbarHeight = () => {
		switch (variant) {
			case 'dense':
				return 48;
			case 'prominent':
				return 128;
			default:
				return 64;
		}
	};

	const toolbarContent = (
		<Toolbar
			variant={variant === 'dense' ? 'dense' : 'regular'}
			sx={{
				minHeight: getToolbarHeight(),
				px: { xs: 1, sm: 2, md: 3 },
				...(variant === 'prominent' && {
					flexDirection: 'column',
					alignItems: 'flex-start',
					py: 2
				})
			}}
		>
			{/* Left Section - Navigation */}
			<Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
				{/* Navbar Toggle Button */}
				{showNavbarToggle && navbarPosition === 'left' && (
					<>
						{!isMobile && (
							<>
								{(navbarStyle === 'style-3' || navbarStyle === 'style-3-dense') && (
									<NavbarToggleButton
										sx={{ mr: 1, width: 40, height: 40, p: 0 }}
										color="inherit"
									/>
								)}
								{navbarStyle === 'style-1' && !navbar.open && (
									<NavbarToggleButton
										sx={{ mr: 1, width: 40, height: 40, p: 0 }}
										color="inherit"
									/>
								)}
							</>
						)}
						{isMobile && (
							<NavbarToggleButton
								sx={{ mr: 1, width: 40, height: 40, p: 0 }}
								color="inherit"
							/>
						)}
					</>
				)}

				{/* Navigation Shortcuts */}
				{!isMobile && <NavigationShortcuts />}

				{/* Logo/Brand */}
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{
						display: { xs: 'none', sm: 'block' },
						fontWeight: 600,
						color: 'inherit',
						ml: showNavbarToggle ? 1 : 0
					}}
				>
					FUSE REACT
				</Typography>
			</Box>

			{/* Center Section - Search (in prominent mode) */}
			{variant === 'prominent' && showSearch && (
				<Box
					sx={{
						width: '100%',
						mt: 2,
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<SimpleSearch />
				</Box>
			)}

			{/* Spacer */}
			<Box sx={{ flexGrow: 1 }} />

			{/* Right Section - Actions */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
				{/* Simple Search for non-prominent modes */}
				{variant !== 'prominent' && showSearch && !isMobile && (
					<Box sx={{ mr: 1 }}>
						<SimpleSearch />
					</Box>
				)}

				{/* Language Switcher */}
				<LanguageSwitcher />

				{/* Fullscreen Toggle */}
				<FullScreenToggle />

				{/* Light/Dark Mode Toggle */}
				<LightDarkModeToggle
					lightTheme={_.find(themeOptions, { id: 'Default' })}
					darkTheme={_.find(themeOptions, { id: 'Default Dark' })}
				/>

				{/* Notifications */}
				{showNotifications && (
					<Tooltip title="Notifications">
						<IconButton
							color="inherit"
							onClick={handleNotificationsOpen}
							aria-label={`show ${notificationCount} new notifications`}
						>
							<Badge
								badgeContent={notificationCount}
								color="error"
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Tooltip>
				)}

				{/* Quick Panel */}
				<QuickPanelToggleButton />

				{/* User Menu */}
				{showUserMenu && !isGuest && (
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleUserMenuOpen}
							color="inherit"
							aria-label="account menu"
						>
							<Avatar 
								sx={{ width: 32, height: 32 }}
								src={photoURL || undefined}
								alt={displayName || 'User'}
							>
								{displayName 
									? initials
									: <AccountCircle />
								}
							</Avatar>
						</IconButton>
					</Tooltip>
				)}

				{/* More menu for mobile */}
				{isMobile && (
					<IconButton
						color="inherit"
						onClick={handleMoreMenuOpen}
						aria-label="more options"
					>
						<MoreVert />
					</IconButton>
				)}

				{/* Navbar Toggle Button for Right Position */}
				{showNavbarToggle && navbarPosition === 'right' && (
					<>
						{!isMobile && (
							<>
								{(navbarStyle === 'style-3' || navbarStyle === 'style-3-dense') && (
									<NavbarToggleButton
										sx={{ ml: 1, width: 40, height: 40, p: 0 }}
										color="inherit"
									/>
								)}
								{navbarStyle === 'style-1' && !navbar.open && (
									<NavbarToggleButton
										sx={{ ml: 1, width: 40, height: 40, p: 0 }}
										color="inherit"
									/>
								)}
							</>
						)}
						{isMobile && (
							<NavbarToggleButton
								sx={{ ml: 1, width: 40, height: 40, p: 0 }}
								color="inherit"
							/>
						)}
					</>
				)}
			</Box>
		</Toolbar>
	);

	// Create the complete component with AppBar and associated menus
	const appBarWithMenus = (
		<>
			<StyledAppBar
				position={position}
				elevation={elevation}
				enableColorOnDark={enableColorOnDark}
				className={clsx('fuse-toolbar', className)}
			>
				{toolbarContent}

				{/* Breadcrumbs */}
				{showBreadcrumbs && variant !== 'dense' && (
					<Box sx={{ px: 3, pb: 1 }}>
						<Breadcrumbs
							aria-label="breadcrumb"
							separator={<ChevronRight fontSize="small" />}
							sx={{ fontSize: '0.875rem' }}
						>
							{getBreadcrumbs().map((breadcrumb, _index) => (
								<Link
									key={breadcrumb.path}
									color="inherit"
									href={breadcrumb.path}
									sx={{
										display: 'flex',
										alignItems: 'center',
										textDecoration: 'none',
										'&:hover': { textDecoration: 'underline' }
									}}
								>
									{breadcrumb.icon}
									{breadcrumb.label}
								</Link>
							))}
						</Breadcrumbs>
					</Box>
				)}
			</StyledAppBar>

			{/* User Menu */}
			<Menu
				anchorEl={anchorElUser}
				open={Boolean(anchorElUser)}
				onClose={handleMenuClose}
				onClick={handleMenuClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				PaperProps={{
					elevation: 3,
					sx: {
						mt: 1.5,
						minWidth: 200,
						'& .MuiMenuItem-root': {
							gap: 1.5
						}
					}
				}}
			>
				{!isGuest ? [
					<MenuItem key="profile" onClick={handleMenuClose}>
						<Avatar 
							sx={{ width: 24, height: 24 }} 
							src={photoURL || undefined}
						>
							{displayName 
								? initials
								: <AccountCircle />
							}
						</Avatar>
						{displayName || 'Profile'}
					</MenuItem>,
					<MenuItem key="dashboard" onClick={handleMenuClose}>
						<Dashboard sx={{ width: 24, height: 24 }} />
						Dashboard
					</MenuItem>,
					<MenuItem key="settings" onClick={handleMenuClose}>
						<SettingsIcon sx={{ width: 24, height: 24 }} />
						Settings
					</MenuItem>,
					<Divider key="divider" />,
					<MenuItem 
						key="logout"
						onClick={handleLogoutClick}
						disabled={isLoggingOut}
						sx={{ 
							color: 'error.main',
							'&:hover': {
								backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08)
							}
						}}
					>
						<Logout sx={{ width: 24, height: 24 }} />
						{isLoggingOut ? "Logging out..." : "Logout"}
					</MenuItem>
				] : [
					<MenuItem 
						key="signin"
						onClick={() => {
							navigate('/sign-in');
							handleMenuClose();
						}}
					>
						<AccountCircle sx={{ width: 24, height: 24 }} />
						Sign In
					</MenuItem>,
					<MenuItem 
						key="signup"
						onClick={() => {
							navigate('/sign-up');
							handleMenuClose();
						}}
					>
						<Person sx={{ width: 24, height: 24 }} />
						Sign Up
					</MenuItem>
				]}
			</Menu>

			{/* Notifications Menu */}
			<Menu
				anchorEl={anchorElNotifications}
				open={Boolean(anchorElNotifications)}
				onClose={handleMenuClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				PaperProps={{
					elevation: 3,
					sx: {
						mt: 1.5,
						maxWidth: 360,
						maxHeight: 400
					}
				}}
			>
				<Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
					<Typography variant="h6">Notifications</Typography>
				</Box>
				<MenuItem onClick={handleMenuClose}>
					<Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
						<Person />
					</Avatar>
					<Box>
						<Typography variant="body2">New user registered</Typography>
						<Typography
							variant="caption"
							color="text.secondary"
						>
							2 minutes ago
						</Typography>
					</Box>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Avatar sx={{ mr: 2, bgcolor: 'success.main' }}>
						<Dashboard />
					</Avatar>
					<Box>
						<Typography variant="body2">System update available</Typography>
						<Typography
							variant="caption"
							color="text.secondary"
						>
							1 hour ago
						</Typography>
					</Box>
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<Avatar sx={{ mr: 2, bgcolor: 'warning.main' }}>
						<NotificationsIcon />
					</Avatar>
					<Box>
						<Typography variant="body2">Maintenance scheduled</Typography>
						<Typography
							variant="caption"
							color="text.secondary"
						>
							3 hours ago
						</Typography>
					</Box>
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={handleMenuClose}
					sx={{ justifyContent: 'center' }}
				>
					<Typography
						variant="body2"
						color="primary"
					>
						View all notifications
					</Typography>
				</MenuItem>
			</Menu>

			{/* Mobile More Menu */}
			<Menu
				anchorEl={anchorElMore}
				open={Boolean(anchorElMore)}
				onClose={handleMenuClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={handleMenuClose}>
					<SearchIcon sx={{ mr: 1 }} />
					Search
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<NotificationsIcon sx={{ mr: 1 }} />
					Notifications
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<SettingsIcon sx={{ mr: 1 }} />
					Settings
				</MenuItem>
			</Menu>

			{/* Logout Confirmation Dialog */}
			<Dialog
				open={logoutDialogOpen}
				onClose={handleLogoutCancel}
				aria-labelledby="logout-dialog-title"
				aria-describedby="logout-dialog-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle id="logout-dialog-title">
					Confirm Logout
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="logout-dialog-description">
						Are you sure you want to log out? You will need to sign in again to access your account.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button 
						onClick={handleLogoutCancel} 
						color="primary"
						disabled={isLoggingOut}
					>
						Cancel
					</Button>
					<Button 
						onClick={handleLogout} 
						color="error" 
						variant="contained"
						disabled={isLoggingOut}
						startIcon={isLoggingOut ? <CircularProgress size={20} /> : <Logout />}
					>
						{isLoggingOut ? 'Logging out...' : 'Logout'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);

	// Return with or without hide on scroll
	return hideOnScroll ? <HideOnScroll>{appBarWithMenus}</HideOnScroll> : appBarWithMenus;
}

export default MaterialUIAppBar;
