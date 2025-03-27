import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const Customer = lazy(() => import('./Customer'));

/**
 * The Example page route.
 */
const CustomerRoute: FuseRouteItemType = {
	path: 'customer',
	element: <Customer />
};

export default CustomerRoute;
