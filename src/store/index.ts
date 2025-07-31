// Migration: Redux removed, this file provides compatibility exports
// Please migrate components to use TanStack Query and React Context

export * from './hooks';
export { default as withSlices } from './withSlices';

// Legacy store compatibility
export const store = {
	dispatch: () => console.error('Redux store is deprecated in v16.0.0'),
	getState: () => ({}),
	subscribe: () => () => {},
	replaceReducer: () => console.error('Redux store is deprecated in v16.0.0')
};

export type RootState = {};
export type AppDispatch = () => void;
