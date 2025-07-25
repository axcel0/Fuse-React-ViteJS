import { styled, ThemeProvider } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { memo, useEffect, useState } from 'react';
import NavbarToggleFabLayout2 from 'src/components/theme-layouts/layout2/components/NavbarToggleFabLayout2';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import usePathname from '@fuse/hooks/usePathname';
import { useNavbarTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import useFuseLayoutSettings from '@fuse/core/FuseLayout/useFuseLayoutSettings';
import NavbarLayout2 from './NavbarLayout2';
import NavbarMobileLayout2 from './NavbarMobileLayout2';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
	'& > .MuiDrawer-paper': {
		height: '100%',
		flexDirection: 'column',
		flex: '1 1 auto',
		width: 280,
		minWidth: 280,
		transition: theme.transitions.create(['width', 'min-width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.shorter
		})
	}
}));

type NavbarWrapperLayout2Props = {
	className?: string;
};

/**
 * The navbar wrapper layout 2.
 */
function NavbarWrapperLayout2(props: NavbarWrapperLayout2Props) {
	const { className = '' } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const { config } = useFuseLayoutSettings();

	const navbarTheme = useNavbarTheme();
	const pathname = usePathname();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useEffect(() => {
		if (isMobile) {
			setMobileOpen(false);
		}
	}, [pathname, isMobile]);

	const handleMobileClose = () => {
		setMobileOpen(false);
	};

	const handleMobileToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleToggle = () => {
		// Desktop navbar toggle logic if needed
	};

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				{!isMobile && <NavbarLayout2 />}

				{isMobile && (
					<StyledSwipeableDrawer
						anchor="left"
						variant="temporary"
						open={mobileOpen}
						onClose={handleMobileClose}
						onOpen={() => {}}
						disableSwipeToOpen
						className={className}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						<NavbarMobileLayout2 />
					</StyledSwipeableDrawer>
				)}
			</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && isMobile && (
				<NavbarToggleFabLayout2 
					onToggle={handleToggle}
					onToggleMobile={handleMobileToggle}
				/>
			)}
		</>
	);
}

export default memo(NavbarWrapperLayout2);
