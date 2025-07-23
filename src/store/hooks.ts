// DEPRECATED: These hooks are deprecated and should be replaced with TanStack Query
// This file exists only for compatibility during migration
// See MIGRATION_GUIDE.md for migration instructions

export const useAppDispatch = () => {
	console.warn('useAppDispatch is deprecated. Please migrate to TanStack Query hooks.');
	return (action: any) => {
		console.warn('Dispatch action ignored:', action);
	};
};

export const useAppSelector = (selector: any) => {
	console.warn('useAppSelector is deprecated. Please migrate to TanStack Query hooks.');
	// Return some default values for compatibility
	if (selector.toString().includes('selectQuickPanelOpen')) {
		return false;
	}
	if (selector.toString().includes('selectQuickPanelData')) {
		return { notes: [], events: [] };
	}
	return null;
};

export const useAppStore = () => {
	console.warn('useAppStore is deprecated. Please migrate to TanStack Query hooks.');
	return null;
};
