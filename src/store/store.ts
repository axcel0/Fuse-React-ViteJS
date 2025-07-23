// Migration: Redux store removed, this file provides compatibility exports
// This file provides compatibility exports during migration

export const store = {
  dispatch: () => console.warn('Redux store is deprecated in v16.0.0'),
  getState: () => ({})
};

export type RootState = Record<string, unknown>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = () => ReturnType;
export type AppStore = typeof store;
export type AppAction<R = Promise<void>> = any;

export const makeStore = () => store;
export const createAppSelector = () => console.warn('createAppSelector is deprecated in v16.0.0');

export default store;
