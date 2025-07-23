import { memo } from 'react';
import MaterialUIFooter from 'src/components/MaterialUIFooter';

type FooterLayout1Props = { 
	className?: string;
	variant?: 'bottom-navigation' | 'full' | 'minimal';
};

/**
 * The footer layout 1 with modern Material-UI design.
 */
function FooterLayout1(props: FooterLayout1Props) {
	const { className, variant = 'minimal' } = props;

	return (
		<MaterialUIFooter
			variant={variant}
			className={className}
			showSocial={true}
			showLinks={variant === 'full'}
			showBottomNav={variant === 'full' || variant === 'bottom-navigation'}
		/>
	);
}

export default memo(FooterLayout1);
