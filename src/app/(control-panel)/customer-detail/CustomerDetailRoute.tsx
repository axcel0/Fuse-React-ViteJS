import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const CustomerDetail = lazy(() => import('./CustomerDetail'));

/**
 * The Example page route.
 */
const CustomerRoute: FuseRouteItemType = {
    path: 'customer-detail/:id',
    element: <CustomerDetail />
};

export default CustomerRoute;
