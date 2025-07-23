import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useNavbar } from '../navbar/NavbarContext';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { FuseNavigationProps } from '@fuse/core/FuseNavigation/FuseNavigation';
import useNavigation from './hooks/useNavigation';

/**
 * Navigation
 */

type NavigationProps = Partial<FuseNavigationProps>;

function Navigation(props: NavigationProps) {
	const { className = '', layout = 'vertical', dense, active } = props;
	const { navigation } = useNavigation();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const { navbarCloseMobile } = useNavbar();

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				navbarCloseMobile();
			}
		}

		return (
			<FuseNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
				checkPermission
			/>
		);
	}, [navbarCloseMobile, isMobile, navigation, active, className, dense, layout]);
}

export default Navigation;
