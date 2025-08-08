import React, { useState } from 'react';
import {
	BottomNavigation,
	BottomNavigationAction,
	Paper,
	Box,
	Typography,
	Container,
	Link,
	Divider,
	IconButton,
	useTheme,
	alpha
} from '@mui/material';
import {
	Home as HomeIcon,
	Search as SearchIcon,
	Dashboard as DashboardIcon,
	Settings as SettingsIcon,
	Facebook as FacebookIcon,
	Twitter as TwitterIcon,
	LinkedIn as LinkedInIcon,
	GitHub as GitHubIcon,
	ElectricCar as ElectricCarIcon,
	Battery90 as BatteryIcon,
	FlashOn as FlashIcon,
	TrendingUp as TrendingUpIcon,
	Speed as SpeedIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const ModernBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
	borderTop: `1px solid ${theme.palette.divider}`,
	minHeight: '64px',
	transition: theme.transitions.create(['background-color'], {
		duration: theme.transitions.duration.short
	})
}));

const FooterContent = styled(Box)(({ theme }) => ({
	background: theme.palette.mode === 'dark' 
		? 'linear-gradient(45deg, #426e9a 0%, #426e9a 40%, #426e9a 60%, #ffa3a3 100%)'
		: 'linear-gradient(45deg, #426e9a 0%, #426e9a 30%, #5a7db0 50%, #ffa3a3 100%)',
	borderTop: `1px solid ${theme.palette.divider}`,
	padding: theme.spacing(3, 0),
	position: 'relative'
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
	color: 'rgba(255, 255, 255, 0.9)',
	backgroundColor: 'rgba(255, 255, 255, 0.1)',
	border: '1px solid rgba(255, 255, 255, 0.2)',
	margin: theme.spacing(0.5),
	transition: theme.transitions.create(['color', 'transform', 'background-color'], {
		duration: theme.transitions.duration.short
	}),
	'&:hover': {
		color: theme.palette.common.white,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		transform: 'translateY(-2px)',
		borderColor: 'rgba(255, 255, 255, 0.4)'
	}
}));

const BrandLogo = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(2),
	marginBottom: theme.spacing(2),
	position: 'relative',
	'& .brand-icon': {
		fontSize: '2.2rem',
		color: theme.palette.common.white,
		filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
		animation: 'subtleFloat 4s ease-in-out infinite',
	},
	'@keyframes subtleFloat': {
		'0%, 100%': { transform: 'translateY(0px)' },
		'50%': { transform: 'translateY(-3px)' },
	}
}));

const MottoText = styled(Typography)(({ theme }) => ({
	color: 'rgba(255, 255, 255, 0.9)',
	fontWeight: 500,
	letterSpacing: '0.3px'
}));

// Main component props
interface MaterialUIFooterProps {
	variant?: 'bottom-navigation' | 'full' | 'minimal';
	showSocial?: boolean;
	showLinks?: boolean;
	showBottomNav?: boolean;
	className?: string;
}

/**
 * Modern Material-UI Footer Component
 */
function MaterialUIFooter(props: MaterialUIFooterProps) {
	const { variant = 'full', showSocial = true, showLinks = true, showBottomNav = true, className } = props;

	const theme = useTheme();
	const [navValue, setNavValue] = useState(0);

	// Navigation items for BottomNavigation
	const navigationItems = [
		{ label: 'Home', icon: <HomeIcon />, href: '/' },
		{ label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
		{ label: 'Search', icon: <SearchIcon />, href: '/search' },
		{ label: 'Settings', icon: <SettingsIcon />, href: '/settings' }
	];

	// Footer links - Updated for Polytron EV with Motion theme
	const footerLinks = {
		'Motion Solutions': [
			{ label: 'Electric Vehicles', href: '/vehicles' },
			{ label: 'Smart Charging', href: '/charging' },
			{ label: 'Battery Innovation', href: '/battery' },
			{ label: 'Mobility Services', href: '/mobility' }
		],
		'Move Further': [
			{ label: 'Sustainability', href: '/sustainability' },
			{ label: 'Future Tech', href: '/technology' },
			{ label: 'Global Impact', href: '/impact' },
			{ label: 'Innovation Hub', href: '/innovation' }
		],
		'Support & Connect': [
			{ label: 'Help Center', href: '/help' },
			{ label: 'Contact Us', href: '/contact' },
			{ label: 'Documentation', href: '/docs' },
			{ label: 'Community', href: '/community' }
		]
	};

	// Social media links
	const socialLinks = [
		{ icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
		{ icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter' },
		{ icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
		{ icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' }
	];

	const handleNavChange = (event: React.SyntheticEvent, newValue: number) => {
		setNavValue(newValue);
		// Navigate to the corresponding route
		const item = navigationItems[newValue];

		if (item && item.href) {
			window.location.href = item.href;
		}
	};

	// Minimal footer variant
	if (variant === 'minimal') {
		return (
			<Paper
				elevation={0}
				className={className}
				sx={{
					borderTop: `1px solid ${theme.palette.divider}`,
					background: theme.palette.mode === 'dark' 
						? 'linear-gradient(45deg, #426e9a 0%, #426e9a 40%, #426e9a 60%, #ffa3a3 100%)'
						: 'linear-gradient(45deg, #426e9a 0%, #426e9a 30%, #5a7db0 50%, #ffa3a3 100%)',
					position: 'relative'
				}}
			>
				<Container maxWidth="lg">
					<Box
						sx={{
							py: 3,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: 2
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<ElectricCarIcon 
								sx={{ 
									fontSize: '1.8rem', 
									color: theme.palette.common.white,
									filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
								}} 
							/>
							<Box>
								<Typography
									variant="h6"
									sx={{
										fontWeight: 600,
										color: theme.palette.common.white,
										textShadow: '0 1px 2px rgba(0,0,0,0.3)'
									}}
								>
									© 2025 Polytron EV
								</Typography>
								<Typography
									variant="body2"
									sx={{
										color: 'rgba(255, 255, 255, 0.9)',
										fontSize: '0.875rem'
									}}
								>
									Designed for A World in Motion
								</Typography>
							</Box>
						</Box>
						{showSocial && (
							<Box sx={{ display: 'flex', gap: 1 }}>
								{socialLinks.map((social, index) => (
									<SocialButton
										key={index}
										size="small"
										onClick={() => window.open(social.href, '_blank')}
										aria-label={social.label}
									>
										{social.icon}
									</SocialButton>
								))}
							</Box>
						)}
					</Box>
				</Container>
			</Paper>
		);
	}

	// Bottom navigation only variant
	if (variant === 'bottom-navigation') {
		return (
			<Paper
				sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
				elevation={3}
				className={className}
			>
				<ModernBottomNavigation
					value={navValue}
					onChange={handleNavChange}
					showLabels
				>
					{navigationItems.map((item, index) => (
						<BottomNavigationAction
							key={index}
							label={item.label}
							icon={item.icon}
						/>
					))}
				</ModernBottomNavigation>
			</Paper>
		);
	}

	// Full footer variant (default)
	return (
		<Paper
			elevation={0}
			className={className}
			sx={{
				background: theme.palette.mode === 'dark' 
					? 'linear-gradient(45deg, #426e9a 0%, #426e9a 40%, #426e9a 60%, #ffa3a3 100%)'
					: 'linear-gradient(45deg, #426e9a 0%, #426e9a 30%, #5a7db0 50%, #ffa3a3 100%)'
			}}
		>
			{/* Bottom Navigation */}
			{showBottomNav && (
				<ModernBottomNavigation
					value={navValue}
					onChange={handleNavChange}
					showLabels
				>
					{navigationItems.map((item, index) => (
						<BottomNavigationAction
							key={index}
							label={item.label}
							icon={item.icon}
						/>
					))}
				</ModernBottomNavigation>
			)}

			{/* Footer Content */}
			<FooterContent>
				<Container maxWidth="lg">
					{/* Brand and Social Section */}
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3, mb: 3 }}>
						<BrandLogo>
							<ElectricCarIcon className="brand-icon" />
							<Box>
								<Typography
									variant="h5"
									component="h2"
									sx={{
										fontWeight: 600,
										color: theme.palette.common.white,
										textShadow: '0 1px 2px rgba(0,0,0,0.3)',
										mb: 0.5
									}}
								>
									Polytron EV
								</Typography>
								<MottoText sx={{ mb: 0.5, fontSize: '0.9rem' }}>
									Designed for A World in Motion
								</MottoText>
								<Typography
									variant="body2"
									sx={{
										color: 'rgba(255, 255, 255, 0.8)',
										fontWeight: 500,
										fontSize: '0.875rem'
									}}
								>
									Inspired to #MoveFurther
								</Typography>
							</Box>
						</BrandLogo>

						{/* Social Media Links */}
						{showSocial && (
							<Box>
								<Typography
									variant="body2"
									sx={{ 
										mb: 2, 
										fontWeight: 500,
										color: 'rgba(255, 255, 255, 0.9)'
									}}
								>
									Connect with us
								</Typography>
								<Box sx={{ display: 'flex', gap: 0.5 }}>
									{socialLinks.map((social, index) => (
										<SocialButton
											key={index}
											onClick={() => window.open(social.href, '_blank')}
											aria-label={social.label}
											size="small"
										>
											{social.icon}
										</SocialButton>
									))}
								</Box>
							</Box>
						)}
					</Box>

					<Divider 
						sx={{ 
							mb: 2,
							backgroundColor: 'rgba(255, 255, 255, 0.2)',
							height: '1px'
						}} 
					/>

					{/* Copyright Section - Minimalis */}
					<Box sx={{ textAlign: 'center' }}>
						<Typography
							variant="body2"
							sx={{
								mb: 0.5,
								color: theme.palette.common.white,
								fontWeight: 500,
								textShadow: '0 1px 2px rgba(0,0,0,0.3)'
							}}
						>
							© 2025 Polytron EV. All rights reserved.
						</Typography>
						<Typography
							variant="body2"
							sx={{ 
								fontSize: '0.75rem',
								color: 'rgba(255, 255, 255, 0.8)'
							}}
						>
							Pioneering sustainable mobility solutions
						</Typography>
					</Box>
				</Container>
			</FooterContent>
		</Paper>
	);
}

export default MaterialUIFooter;
