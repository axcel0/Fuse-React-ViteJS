// Migration: Redux middleware removed, this file provides compatibility exports
// This file provides compatibility exports during migration

export const dynamicMiddleware = {
  // Empty compatibility object
};

export const addAppMiddleware = () => {
  console.warn('addAppMiddleware is deprecated in v16.0.0');
};

export const withAppMiddleware = () => {
  console.warn('withAppMiddleware is deprecated in v16.0.0');
};

export const createAppDispatchWithMiddlewareHook = () => {
  console.warn('createAppDispatchWithMiddlewareHook is deprecated in v16.0.0');
};

export default dynamicMiddleware;
