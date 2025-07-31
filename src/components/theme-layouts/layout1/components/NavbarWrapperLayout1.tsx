import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useNavbar } from 'src/components/theme-layouts/components/navbar/NavbarContext';
import usePathname from '@fuse/hooks/usePathname';
import useFuseLayoutSettings from '@fuse/core/FuseLayout/useFuseLayoutSettings';
import { useNavbarTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import NavbarToggleFabLayout1 from './NavbarToggleFabLayout1';
import NavbarStyle1 from './navbar/style-1/NavbarStyle1';
import NavbarStyle2 from './navbar/style-2/NavbarStyle2';
import NavbarStyle3 from './navbar/style-3/NavbarStyle3';

/**
 * The navbar wrapper layout 1.
 */
function NavbarWrapperLayout1() {
	const { config } = useFuseLayoutSettings();

	const { navbar: _navbar, navbarCloseMobile } = useNavbar();
	const pathname = usePathname();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	useEffect(() => {
		if (isMobile) {
			navbarCloseMobile();
		}
	}, [navbarCloseMobile, pathname, isMobile]);

	const navbarTheme = useNavbarTheme();

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<>
					{config.navbar.style === 'style-1' && <NavbarStyle1 />}
					{config.navbar.style === 'style-2' && <NavbarStyle2 />}
					{config.navbar.style === 'style-3' && <NavbarStyle3 />}
					{config.navbar.style === 'style-3-dense' && <NavbarStyle3 dense />}
				</>
			</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && !isMobile && <NavbarToggleFabLayout1 />}
		</>
	);
}

export default NavbarWrapperLayout1;
