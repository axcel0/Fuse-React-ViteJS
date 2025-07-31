// Migration: Redux removed, this file provides compatibility exports
// Components should migrate to TanStack Query for server state
// and React Context/useState for local component state

export const useAppDispatch = () => {
	console.error('useAppDispatch is deprecated. Please migrate to React Context or TanStack Query.');
	return () => console.error('Redux dispatch is deprecated');
};

export const useAppSelector = (selector: (state: unknown) => unknown) => {
	console.error('useAppSelector is deprecated. Please migrate to React Context or TanStack Query.');

	// Return empty object or default values to prevent crashes
	if (typeof selector === 'function') {
		return selector({});
	}

	return {};
};

// Legacy compatibility exports
export type AppDispatch = () => void;
export type RootState = {};
