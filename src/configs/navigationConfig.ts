import i18n from '@i18n';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		translate: 'DASHBOARD',
		type: 'item',
		icon: 'heroicons-outline:home',
		url: 'dashboard'
	},
	{
		id: 'example-component',
		title: 'Example',
		translate: 'EXAMPLE',
		type: 'item',
		icon: 'heroicons-outline:star',
		url: 'example'
	},
	{
		id: 'material-ui-demo',
		title: 'Material UI Demo',
		translate: 'MATERIAL_UI_DEMO',
		type: 'item',
		icon: 'heroicons-outline:code',
		url: 'material-ui-appbar-demo'
	},
	{
		id: 'apps',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'heroicons-outline:folder',
		children: [
			{
				id: 'container',
				title: 'Container',
				translate: 'CONTAINER',
				type: 'item',
				icon: 'heroicons-outline:cube',
				url: 'container'
			},
			{
				id: 'status-motor',
				title: 'Status Motor',
				translate: 'STATUS_MOTOR',
				type: 'item',
				icon: 'heroicons-outline:cog',
				url: 'statusmotor'
			}
		]
	}
];

export default navigationConfig;
