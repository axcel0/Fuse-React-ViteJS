import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { lazy } from 'react';

const DesignSystemDemo = lazy(() => import('./page'));

/**
 * Design System Demo Route Configuration
 */
const DesignSystemDemoRoute: FuseRouteItemType = {
	path: 'design-system-demo',
	element: <DesignSystemDemo />
};

export default DesignSystemDemoRoute;
