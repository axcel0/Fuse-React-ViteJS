import { memo } from 'react';
import MaterialUIAppBar from 'src/components/MaterialUIAppBar';
import useFuseLayoutSettings from '@fuse/core/FuseLayout/useFuseLayoutSettings';
import { Layout1ConfigDefaultsType } from '@/components/theme-layouts/layout1/Layout1Config';

type ToolbarLayout1Props = {
	className?: string;
};

/**
 * The toolbar layout 1 - Now using MaterialUIAppBar
 */
function ToolbarLayout1(props: ToolbarLayout1Props) {
	const { className } = props;

	const settings = useFuseLayoutSettings();
	const config = settings.config as Layout1ConfigDefaultsType;

	return (
		<MaterialUIAppBar
			className={className}
			position="static"
			variant="prominent"
			elevation={1}
			hideOnScroll={false}
			enableColorOnDark={true}
			showBreadcrumbs={true}
			showSearch={true}
			showNotifications={true}
			showUserMenu={true}
			showNavbarToggle={config.navbar.display}
			navbarPosition={config.navbar.position as 'left' | 'right'}
			navbarStyle={config.navbar.style}
		/>
	);
}

export default memo(ToolbarLayout1);
