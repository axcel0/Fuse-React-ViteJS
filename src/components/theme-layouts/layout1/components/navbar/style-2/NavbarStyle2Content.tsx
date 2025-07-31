import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Navigation from 'src/components/theme-layouts/components/navigation/Navigation';
import UserMenu from 'src/components/theme-layouts/components/UserMenu';
import { Divider } from '@mui/material';
import NavbarPinToggleButton from 'src/components/theme-layouts/components/navbar/NavbarPinToggleButton';
import Logo from '../../../../components/Logo';
import GoToDocBox from '@/components/theme-layouts/components/GoToDocBox';

const Root = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	'& ::-webkit-scrollbar-thumb': {
		boxShadow: `inset 0 0 0 20px ${'rgba(255, 255, 255, 0.24)'}`,
		...theme.applyStyles('light', {
			boxShadow: `inset 0 0 0 20px ${'rgba(0, 0, 0, 0.24)'}`
		})
	},
	'& ::-webkit-scrollbar-thumb:active': {
		boxShadow: `inset 0 0 0 20px ${'rgba(255, 255, 255, 0.37)'}`,
		...theme.applyStyles('light', {
			boxShadow: `inset 0 0 0 20px ${'rgba(0, 0, 0, 0.37)'}`
		})
	}
}));

const StyledContent = styled(FuseScrollbars)(() => ({
	overscrollBehavior: 'contain',
	overflowX: 'hidden',
	overflowY: 'auto',
	WebkitOverflowScrolling: 'touch',
	backgroundRepeat: 'no-repeat',
	backgroundSize: '100% 40px, 100% 10px',
	backgroundAttachment: 'local, scroll'
}));

type NavbarStyle2ContentProps = {
	className?: string;
};

/**
 * The navbar style 2 content.
 */
function NavbarStyle2Content(props: NavbarStyle2ContentProps) {
	const { className = '' } = props;

	return (
		<Root className={clsx('flex h-full flex-auto flex-col overflow-hidden', className)}>
			<div className="flex h-3 shrink-0 flex-row items-center px-0.75 md:h-4.75 gap-0.375">
				<Logo />
				<NavbarPinToggleButton className="h-2 w-2 p-0" />
			</div>

			<StyledContent
				className="flex min-h-0 flex-1 flex-col"
				option={{ suppressScrollX: true, wheelPropagation: false }}
			>
				<Navigation layout="vertical" />
			</StyledContent>

			<GoToDocBox className="mx-0.75 my-1" />

			<Divider />

			<div className="p-0.25 md:p-0.625 w-full">
				<UserMenu className="w-full" />
			</div>
		</Root>
	);
}

export default memo(NavbarStyle2Content);
