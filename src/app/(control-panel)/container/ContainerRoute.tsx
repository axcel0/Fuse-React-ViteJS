import i18next from 'i18next';
import { lazy } from 'react';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import en from './i18n/en';
import id from './i18n/id';

i18next.addResourceBundle('en', 'containerPage', en);
i18next.addResourceBundle('id', 'containerPage', id);

const Container = lazy(() => import('./Container'));

/**
 * The Container Status page route.
 */
const ContainerRoute: FuseRouteItemType = {
	path: '/container',
	element: <Container />
};

export default ContainerRoute;
