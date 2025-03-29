import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { lazy } from 'react';

const CustomerDetail = lazy(() => import('./CustomerDetail'))

const CustomerDetailRoute: FuseRouteItemType = {
    path: 'customer-detail',
    element: <CustomerDetail />
}

export default CustomerDetailRoute;