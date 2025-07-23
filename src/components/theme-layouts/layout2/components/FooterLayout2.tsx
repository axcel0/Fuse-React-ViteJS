import { memo } from 'react';
import MaterialUIFooter from 'src/components/MaterialUIFooter';

type FooterLayout2Props = {
	className?: string;
	variant?: 'bottom-navigation' | 'full' | 'minimal';
};

/**
 * The footer layout 2 with modern Material-UI BottomNavigation
 */
function FooterLayout2(props: FooterLayout2Props) {
	const { className, variant = 'full' } = props;

	return (
		<MaterialUIFooter
			variant={variant}
			className={className}
			showSocial={true}
			showLinks={true}
			showBottomNav={variant === 'full' || variant === 'bottom-navigation'}
		/>
	);
}

export default memo(FooterLayout2);
