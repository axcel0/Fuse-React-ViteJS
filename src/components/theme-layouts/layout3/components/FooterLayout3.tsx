import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useFooterTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { useTheme } from '../../../../theme/useTheme';

type FooterLayout3Props = {
	className?: string;
};

/**
 * The footer layout 3.
 */
function FooterLayout3(props: FooterLayout3Props) {
	const { className = '' } = props;
	const footerTheme = useFooterTheme();
	const { resolvedTheme } = useTheme();

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx(
					'relative z-20 shadow-md',
					// Add Tailwind classes based on resolved theme
					resolvedTheme === 'dark' 
						? 'bg-gray-900 text-white' 
						: 'bg-white text-gray-900',
					className
				)}
				color="default"
				style={{ 
					backgroundColor: resolvedTheme === 'dark' 
						? '#111827' // gray-900
						: '#ffffff', // white
					color: resolvedTheme === 'dark' 
						? '#ffffff' 
						: '#111827'
				}}
			>
				<Toolbar className="container flex min-h-12 items-center overflow-x-auto px-2 py-0 sm:px-3 md:min-h-16 lg:px-5">
					Footer
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout3);
