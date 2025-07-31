// Migration: Redux slice replaced with simplified compatibility layer
// This file provides compatibility exports during migration

import { FuseFlatNavItemType, FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import FuseNavigationHelper from '@fuse/utils/FuseNavigationHelper';
import navigationConfig from 'src/configs/navigationConfig';

// Initialize navigation data
const initialNavigation = FuseNavigationHelper.flattenNavigation(navigationConfig);

// Legacy action creators (now simplified)
export const appendNavigationItem = (item: FuseNavItemType, parentId?: string | null) => {
	console.warn('appendNavigationItem action is deprecated. Navigation should be managed via context');
	return { type: 'DEPRECATED', payload: { item, parentId } };
};

export const prependNavigationItem = (item: FuseNavItemType, parentId?: string | null) => {
	console.warn('prependNavigationItem action is deprecated. Navigation should be managed via context');
	return { type: 'DEPRECATED', payload: { item, parentId } };
};

export const updateNavigationItem = (id: string, item: Record<string, unknown>) => {
	console.error('updateNavigationItem action is deprecated. Navigation should be managed via context');
	return { type: 'DEPRECATED', payload: { id, item } };
};

export const removeNavigationItem = (id: string) => {
	console.warn('removeNavigationItem action is deprecated. Navigation should be managed via context');
	return { type: 'DEPRECATED', payload: { id } };
};

export const setNavigation = (navigation: FuseNavItemType[]) => {
	console.warn('setNavigation action is deprecated. Navigation should be managed via context');
	return { type: 'DEPRECATED', payload: navigation };
};

export const resetNavigation = () => {
	console.warn('resetNavigation action is deprecated. Navigation should be managed via context');
	return { type: 'DEPRECATED' };
};

// Legacy selectors (now return static data for compatibility)
export const selectNavigationAll = (state?: any) => initialNavigation;
export const selectNavigationIds = (state?: any) => initialNavigation.map((item: FuseFlatNavItemType) => item.id);
export const selectNavigationItemById = (state?: any, id?: string) =>
	initialNavigation.find((item: FuseFlatNavItemType) => item.id === id);

// Compatibility exports
export const navigationSlice = {
	actions: { setNavigation, resetNavigation },
	name: 'navigation',
};

export type navigationSliceType = typeof navigationSlice;
export default {}; // Empty reducer for compatibility
