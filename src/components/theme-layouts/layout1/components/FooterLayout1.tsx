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
	const { className, variant = 'full' } = props;

	return (
		<MaterialUIFooter
			variant={variant}
			className={className}
			showSocial={true}
			showLinks={true}
			showBottomNav={false}
		/>
	);
}

export default memo(FooterLayout1);
