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
	Home,
	Menu as MenuIcon,
	Close as CloseIcon,
	ChevronRight
} from '@mui/icons-material';
import { usePageTitle } from 'src/contexts/PageTitleContext';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// Import components yang sudah ada
import { useNavbar } from 'src/components/theme-layouts/components/navbar/NavbarContext';
import NavbarToggleButton from 'src/components/theme-layouts/components/navbar/NavbarToggleButton';
import LightDarkModeToggle from 'src/components/LightDarkModeToggle';
import FullScreenToggle from 'src/components/theme-layouts/components/FullScreenToggle';
import LanguageSwitcher from 'src/components/theme-layouts/components/LanguageSwitcher';
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

// Enhanced Sticky AppBar with footer-matching design
const StyledAppBar = styled(AppBar)(({ theme }) => ({
	// Consistent color scheme with footer
	background: theme.palette.mode === 'dark' 
		? `linear-gradient(135deg, 
			rgba(15, 23, 42, 0.95) 0%, 
			rgba(30, 41, 59, 0.9) 50%, 
			rgba(51, 65, 85, 0.85) 100%
		)`
		: `linear-gradient(135deg, 
			rgba(66, 110, 154, 0.95) 0%, 
			rgba(90, 130, 170, 0.9) 50%, 
			rgba(115, 150, 185, 0.85) 100%
		)`,
	color: theme.palette.common.white,
	
	// Enhanced shadow for sticky positioning
	boxShadow: theme.palette.mode === 'dark'
		? '0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.2)'
		: '0 4px 20px rgba(66, 110, 154, 0.2), 0 1px 8px rgba(66, 110, 154, 0.15)',
	
	// Glassmorphism effect for modern look
	backdropFilter: 'blur(12px)',
	WebkitBackdropFilter: 'blur(12px)', // Safari support
	
	// Subtle border for definition
	borderBottom: theme.palette.mode === 'dark'
		? '1px solid rgba(255, 255, 255, 0.1)'
		: '1px solid rgba(255, 255, 255, 0.2)',
	
	// Smooth transitions for interactions
	transition: theme.transitions.create([
		'background', 
		'box-shadow', 
		'border-color'
	], {
		duration: theme.transitions.duration.standard,
		easing: theme.transitions.easing.easeInOut
	}),
	
	// Subtle hover effects for interactive elements
	'&:hover': {
		boxShadow: theme.palette.mode === 'dark'
			? '0 6px 25px rgba(0, 0, 0, 0.4), 0 2px 12px rgba(0, 0, 0, 0.25)'
			: '0 6px 25px rgba(66, 110, 154, 0.25), 0 2px 12px rgba(66, 110, 154, 0.2)',
		borderBottomColor: theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, 0.15)'
			: 'rgba(255, 255, 255, 0.3)',
	},
	
	// Ensure proper layering
	zIndex: theme.zIndex.appBar + 1,
	
	// Full width sticky positioning
	width: '100%',
	position: 'sticky',
	top: 0,
	
	// No margins for sticky layout
	margin: 0,
	borderRadius: 0
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

// Enhanced Mobile Menu component for luxury design
const EnhancedMobileMenu = styled(Menu)(({ theme }) => ({
	'& .MuiPaper-root': {
		background: 'linear-gradient(135deg, rgba(66, 110, 154, 0.95) 0%, rgba(255, 163, 163, 0.95) 100%)',
		backdropFilter: 'blur(20px)',
		border: '1px solid rgba(255, 255, 255, 0.2)',
		borderRadius: theme.spacing(2),
		marginTop: theme.spacing(1),
		minWidth: 280,
		boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
		'&::before': {
			content: '""',
			position: 'absolute',
			top: -8,
			right: 20,
			width: 16,
			height: 16,
			background: 'linear-gradient(135deg, #426e9a 0%, #ffa3a3 100%)',
			transform: 'rotate(45deg)',
			border: '1px solid rgba(255, 255, 255, 0.2)',
			borderBottomColor: 'transparent',
			borderRightColor: 'transparent'
		}
	},
	'& .MuiMenuItem-root': {
		color: 'white',
		padding: theme.spacing(1.5, 2),
		margin: theme.spacing(0.5, 1),
		borderRadius: theme.spacing(1),
		fontSize: '0.95rem',
		fontWeight: 400,
		transition: theme.transitions.create(['background-color', 'color', 'transform'], {
			duration: theme.transitions.duration.short
		}),
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.15)',
			color: 'white',
			transform: 'translateX(4px)'
		},
		'& .MuiListItemIcon-root': {
			color: 'rgba(255, 255, 255, 0.8)',
			minWidth: 40,
			'& .MuiSvgIcon-root': {
				fontSize: '1.25rem'
			}
		},
		'&:first-of-type': {
			marginTop: theme.spacing(1)
		},
		'&:last-of-type': {
			marginBottom: theme.spacing(1)
		}
	}
}));

// Mobile menu button with luxury styling
const MobileMenuButton = styled(IconButton)(({ theme }) => ({
	color: 'rgba(255, 255, 255, 0.9)',
	backgroundColor: 'rgba(255, 255, 255, 0.1)',
	backdropFilter: 'blur(10px)',
	border: '1px solid rgba(255, 255, 255, 0.2)',
	borderRadius: theme.spacing(1.5),
	padding: theme.spacing(1),
	marginLeft: theme.spacing(1),
	transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
		duration: theme.transitions.duration.short
	}),
	'&:hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		transform: 'translateY(-2px)',
		boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
		color: 'white'
	},
	[theme.breakpoints.up('md')]: {
		display: 'none'
	}
}));

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
	const { pageTitle } = usePageTitle();
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
	const [anchorElMobile, setAnchorElMobile] = useState<null | HTMLElement>(null);
	const [notificationCount, _setNotificationCount] = useState(3);
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

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElMobile(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorElUser(null);
		setAnchorElNotifications(null);
		setAnchorElMobile(null);
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

	// Enhanced Search Component with global search integration
	const SimpleSearch = () => {
		return null; // Search removed from header
	};

	// Enhanced Toolbar variants with luxury spacing and typography
	const getToolbarHeight = () => {
		switch (variant) {
			case 'dense':
				return 56; // Slightly larger than default for better touch targets
			case 'prominent':
				return 140; // More spacious for premium feel
			default:
				return 72; // Enhanced standard height
		}
	};

	const toolbarContent = (
		<Toolbar
			variant={variant === 'dense' ? 'dense' : 'regular'}
			sx={{
				minHeight: getToolbarHeight(),
				px: { xs: 2, sm: 3, md: 4 }, // Enhanced responsive padding
				py: variant === 'prominent' ? 2 : 1,
				...(variant === 'prominent' && {
					flexDirection: 'column',
					alignItems: 'stretch', // Allow full width usage
					gap: 2 // Better spacing between sections
				})
			}}
		>
			{/* Top Row for Prominent Variant or Main Row for Others */}
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				...(variant === 'prominent' && {
					justifyContent: 'space-between' // Space between left and right sections
				})
			}}>
				{/* Left Section - Navigation with enhanced layout */}
				<Box sx={{ 
					display: 'flex', 
					alignItems: 'center', 
					gap: { xs: 1, sm: 2 } // Responsive gap
				}}>
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

					{/* Enhanced Logo/Brand with consistent white text */}
					<Typography
						variant={variant === 'prominent' ? 'h4' : 'h5'}
						noWrap
						component="div"
						sx={{
							display: { xs: variant === 'prominent' ? 'block' : 'none', sm: 'block' },
							fontWeight: variant === 'prominent' ? 700 : 600,
							color: 'rgba(255, 255, 255, 0.95)',
							textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
							letterSpacing: variant === 'prominent' ? '0.5px' : '0.3px',
							ml: showNavbarToggle ? { xs: 0.5, sm: 1 } : 0,
							transition: _theme.transitions.create([
								'font-size', 
								'letter-spacing', 
								'color', 
								'text-shadow'
							], {
								duration: _theme.transitions.duration.short
							}),
							'&:hover': {
								color: 'white',
								textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
							}
						}}
					>
						{pageTitle}
					</Typography>
				</Box>

				{/* Spacer for non-prominent variants */}
				{variant !== 'prominent' && <Box sx={{ flexGrow: 1 }} />}

				{/* Right Section - All Action Buttons in Top Right Corner */}
				<Box sx={{ 
					display: 'flex', 
					alignItems: 'center', 
					gap: { xs: 0.5, sm: 1 }, // Responsive gap
					justifyContent: 'flex-end' // Ensure items stay to the right
				}}>
					{/* Enhanced Search for non-prominent modes - REMOVED */}

					{/* Enhanced Action Buttons with premium styling */}
					<Box sx={{ 
						display: 'flex', 
						alignItems: 'center', 
						gap: { xs: 0.5, sm: 1 },
						'& .MuiIconButton-root': {
							color: 'rgba(255, 255, 255, 0.9)',
							transition: _theme.transitions.create(['color', 'transform', 'background-color'], {
								duration: _theme.transitions.duration.short
							}),
							'&:hover': {
								color: 'white',
								backgroundColor: 'rgba(255, 255, 255, 0.1)',
								transform: 'scale(1.05)'
							}
						}
					}}>
						{/* Language Switcher */}
						<LanguageSwitcher />

						{/* Fullscreen Toggle */}
						<FullScreenToggle />

						{/* Light/Dark Mode Toggle */}
						<LightDarkModeToggle
							lightTheme={_.find(themeOptions, { id: 'Default' })}
							darkTheme={_.find(themeOptions, { id: 'Default Dark' })}
						/>

						{/* Enhanced Notifications with consistent tooltip */}
						{showNotifications && (
							<Tooltip 
								title="Notifications" 
								arrow
								sx={{
									'& .MuiTooltip-tooltip': {
										backgroundColor: 'rgba(0, 0, 0, 0.8)',
										backdropFilter: 'blur(10px)',
										border: '1px solid rgba(255, 255, 255, 0.1)'
									}
								}}
							>
								<IconButton
									color="inherit"
									onClick={handleNotificationsOpen}
									aria-label={`show ${notificationCount} new notifications`}
									sx={{
										position: 'relative',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.1)',
											transform: 'scale(1.05)'
										}
									}}
								>
									<Badge
										badgeContent={notificationCount}
										color="error"
										sx={{
											'& .MuiBadge-badge': {
												backgroundColor: '#ef4444',
												color: 'white',
												fontWeight: 600,
												fontSize: '0.75rem',
												boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
												border: '2px solid rgba(66, 110, 154, 0.8)'
											}
										}}
									>
										<NotificationsIcon sx={{ fontSize: '1.4rem' }} />
									</Badge>
								</IconButton>
							</Tooltip>
						)}

						{/* Quick Panel */}
						<QuickPanelToggleButton />

						{/* Enhanced User Menu with consistent styling */}
						{showUserMenu && !isGuest && (
							<Tooltip 
								title="Account settings"
								arrow
								sx={{
									'& .MuiTooltip-tooltip': {
										backgroundColor: 'rgba(0, 0, 0, 0.8)',
										backdropFilter: 'blur(10px)',
										border: '1px solid rgba(255, 255, 255, 0.1)'
									}
								}}
							>
								<IconButton
									onClick={handleUserMenuOpen}
									color="inherit"
									aria-label="account menu"
									sx={{
										p: 0.5,
										ml: 1,
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.1)',
											transform: 'scale(1.05)'
										}
									}}
								>
									<Avatar 
										sx={{ 
											width: { xs: 36, sm: 40 }, 
											height: { xs: 36, sm: 40 },
											border: '2px solid rgba(255, 255, 255, 0.3)',
											boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
											transition: _theme.transitions.create(['border-color', 'box-shadow'], {
												duration: _theme.transitions.duration.short
											}),
											'&:hover': {
												borderColor: 'rgba(255, 255, 255, 0.5)',
												boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
											}
										}}
										src={photoURL || undefined}
										alt={displayName || 'User'}
									>
										{displayName 
											? initials
											: <AccountCircle sx={{ fontSize: '1.5rem' }} />
										}
									</Avatar>
								</IconButton>
							</Tooltip>
						)}
					</Box>

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
								<>
									{/* Mobile Menu Button */}
									<MobileMenuButton
										onClick={handleMobileMenuOpen}
										aria-label="open mobile menu"
										sx={{ display: { xs: 'flex', md: 'none' } }}
									>
										<MenuIcon />
									</MobileMenuButton>
									
									<NavbarToggleButton
										sx={{ ml: 1, width: 40, height: 40, p: 0 }}
										color="inherit"
									/>
								</>
							)}
						</>
					)}
				</Box>
			</Box>

			{/* Center Section - Enhanced Search for prominent mode - REMOVED */}
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

				{/* Enhanced Breadcrumbs with luxury styling */}
				{showBreadcrumbs && variant !== 'dense' && (
					<Box sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 1.5 }}>
						<Breadcrumbs
							aria-label="breadcrumb"
							separator={
								<ChevronRight 
									fontSize="small" 
									sx={{ 
										color: 'rgba(255, 255, 255, 0.6)',
										transition: 'color 0.2s ease'
									}} 
								/>
							}
							sx={{ 
								fontSize: '0.9rem',
								'& .MuiBreadcrumbs-separator': {
									color: 'rgba(255, 255, 255, 0.6)',
									mx: 1
								}
							}}
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
										color: 'rgba(255, 255, 255, 0.8)',
										fontWeight: 400,
										padding: _theme.spacing(0.5, 1),
										borderRadius: _theme.spacing(1),
										transition: _theme.transitions.create(['color', 'background-color', 'transform'], {
											duration: _theme.transitions.duration.short
										}),
										'&:hover': { 
											color: 'white',
											backgroundColor: 'rgba(255, 255, 255, 0.1)',
											transform: 'translateY(-1px)',
											textDecoration: 'none'
										},
										'&:last-child': {
											color: 'white',
											fontWeight: 500
										}
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
				slotProps={{
					paper: {
						elevation: 3,
						sx: {
							mt: 1.5,
							minWidth: 200,
							'& .MuiMenuItem-root': {
								gap: 1.5
							}
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
				slotProps={{
					paper: {
						elevation: 3,
						sx: {
							mt: 1.5,
							maxWidth: 360,
							maxHeight: 400
						}
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

			{/* Enhanced Mobile Menu */}
			<EnhancedMobileMenu
				anchorEl={anchorElMobile}
				open={Boolean(anchorElMobile)}
				onClose={handleMenuClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem 
					onClick={() => {
						// Navigate to dashboard
						navigate('/dashboard');
						handleMenuClose();
					}}
				>
					<Dashboard sx={{ mr: 1.5, width: 20, height: 20 }} />
					Dashboard
				</MenuItem>
				<MenuItem 
					onClick={() => {
						// Navigate to profile
						navigate('/profile');
						handleMenuClose();
					}}
				>
					<Person sx={{ mr: 1.5, width: 20, height: 20 }} />
					Profile
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<SearchIcon sx={{ mr: 1.5, width: 20, height: 20 }} />
					Search
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<NotificationsIcon sx={{ mr: 1.5, width: 20, height: 20 }} />
					Notifications
				</MenuItem>
				<MenuItem onClick={handleMenuClose}>
					<SettingsIcon sx={{ mr: 1.5, width: 20, height: 20 }} />
					Settings
				</MenuItem>
			</EnhancedMobileMenu>

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
