import { memo } from 'react';
import MaterialUIFooter from 'src/components/MaterialUIFooter';

type FooterLayout3Props = {
	className?: string;
	variant?: 'bottom-navigation' | 'full' | 'minimal';
};

/**
 * The footer layout 3 with modern Material-UI BottomNavigation
 */
function FooterLayout3(props: FooterLayout3Props) {
	const { className, variant = 'bottom-navigation' } = props;

	return (
		<MaterialUIFooter
			variant={variant}
			className={className}
			showSocial={true}
			showLinks={variant === 'full'}
			showBottomNav={true}
		/>
	);
}

export default memo(FooterLayout3);
