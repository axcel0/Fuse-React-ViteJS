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
	alpha,
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
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const ModernBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
	borderTop: `1px solid ${theme.palette.divider}`,
	minHeight: '64px',
	transition: theme.transitions.create(['background-color'], {
		duration: theme.transitions.duration.short,
	}),
}));

const FooterContent = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50],
	borderTop: `1px solid ${theme.palette.divider}`,
	padding: theme.spacing(3, 0),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
	color:
		theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.7) : alpha(theme.palette.common.black, 0.6),
	transition: theme.transitions.create(['color', 'transform'], {
		duration: theme.transitions.duration.short,
	}),

	'&:hover': {
		color: theme.palette.primary.main,
		transform: 'translateY(-2px)',
	},
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
		{ label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
	];

	// Footer links
	const footerLinks = {
		Company: [
			{ label: 'About Us', href: '/about' },
			{ label: 'Our Team', href: '/team' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'News', href: '/news' },
		],
		Support: [
			{ label: 'Help Center', href: '/help' },
			{ label: 'Contact Us', href: '/contact' },
			{ label: 'Documentation', href: '/docs' },
			{ label: 'API Reference', href: '/api' },
		],
		Legal: [
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'Terms of Service', href: '/terms' },
			{ label: 'Cookie Policy', href: '/cookies' },
			{ label: 'GDPR', href: '/gdpr' },
		],
	};

	// Social media links
	const socialLinks = [
		{ icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
		{ icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter' },
		{ icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
		{ icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' },
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
					borderTop: 1,
					borderColor: 'divider',
					backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
				}}
			>
				<Container maxWidth="lg">
					<Box
						sx={{
							py: 2,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: 2,
						}}
					>
						<Typography variant="body2" color="text.secondary">
							© 2025 FUSE React. All rights reserved.
						</Typography>
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
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3} className={className}>
				<ModernBottomNavigation value={navValue} onChange={handleNavChange} showLabels>
					{navigationItems.map((item, index) => (
						<BottomNavigationAction key={index} label={item.label} icon={item.icon} />
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
				backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.common.white,
			}}
		>
			{/* Bottom Navigation */}
			{showBottomNav && (
				<ModernBottomNavigation value={navValue} onChange={handleNavChange} showLabels>
					{navigationItems.map((item, index) => (
						<BottomNavigationAction key={index} label={item.label} icon={item.icon} />
					))}
				</ModernBottomNavigation>
			)}

			{/* Footer Content */}
			<FooterContent>
				<Container maxWidth="lg">
					{/* Footer Links */}
					{showLinks && (
						<Box sx={{ mb: 4 }}>
							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: {
										xs: '1fr',
										sm: 'repeat(2, 1fr)',
										md: 'repeat(3, 1fr)',
									},
									gap: 4,
									mb: 4,
								}}
							>
								{Object.entries(footerLinks).map(([category, links]) => (
									<Box key={category}>
										<Typography
											variant="h6"
											component="h3"
											gutterBottom
											sx={{
												fontSize: '1rem',
												fontWeight: 600,
												color: 'text.primary',
												mb: 2,
											}}
										>
											{category}
										</Typography>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
											{links.map((link, index) => (
												<Link
													key={index}
													href={link.href}
													color="text.secondary"
													underline="hover"
													sx={{
														fontSize: '0.875rem',
														transition: 'color 0.2s ease',
														'&:hover': {
															color: 'primary.main',
														},
													}}
												>
													{link.label}
												</Link>
											))}
										</Box>
									</Box>
								))}
							</Box>
						</Box>
					)}

					<Divider sx={{ mb: 3 }} />

					{/* Footer Bottom */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: 2,
						}}
					>
						<Box>
							<Typography variant="body2" color="text.secondary" gutterBottom>
								© 2025 FUSE React. All rights reserved.
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Built with ❤️ using Material-UI
							</Typography>
						</Box>

						{/* Social Media Links */}
						{showSocial && (
							<Box sx={{ display: 'flex', gap: 1 }}>
								{socialLinks.map((social, index) => (
									<SocialButton
										key={index}
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
			</FooterContent>
		</Paper>
	);
}

export default MaterialUIFooter;
