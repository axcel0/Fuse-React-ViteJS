import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import NavbarToggleFab from 'src/components/theme-layouts/components/navbar/NavbarToggleFab';

type NavbarToggleFabLayout2Props = {
	className?: string;
	onToggle?: () => void;
	onToggleMobile?: () => void;
};

/**
 * The navbar toggle fab layout 2.
 */
function NavbarToggleFabLayout2(props: NavbarToggleFabLayout2Props) {
	const { className, onToggle, onToggleMobile } = props;

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				if (isMobile && onToggleMobile) {
					onToggleMobile();
				} else if (!isMobile && onToggle) {
					onToggle();
				}
			}}
		/>
	);
}

export default NavbarToggleFabLayout2;
