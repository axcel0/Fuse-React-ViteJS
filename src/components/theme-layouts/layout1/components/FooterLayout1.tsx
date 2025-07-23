import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import clsx from 'clsx';
import { useFooterTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import { useTheme } from '../../../../theme/useTheme';

type FooterLayout1Props = { className?: string };

/**
 * The footer layout 1.
 */
function FooterLayout1(props: FooterLayout1Props) {
	const { className } = props;
	const footerTheme = useFooterTheme();
	const { resolvedTheme } = useTheme();

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx(
					'relative z-20 border-t',
					// Add Tailwind classes based on resolved theme
					resolvedTheme === 'dark' 
						? 'bg-gray-900 text-white border-gray-800' 
						: 'bg-white text-gray-900 border-gray-200',
					className
				)}
				color="default"
				sx={{ 
					backgroundColor: resolvedTheme === 'dark' 
						? '#111827' // gray-900
						: '#ffffff', // white
					color: resolvedTheme === 'dark' 
						? '#ffffff' 
						: '#111827'
				}}
				elevation={0}
			>
				<Toolbar className="min-h-12 md:min-h-16 px-2 sm:px-3 py-0 flex items-center overflow-x-auto">
					Footer
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout1);
