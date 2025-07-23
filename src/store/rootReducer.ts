// Migration: Redux removed, this file provides compatibility exports
// This file provides compatibility exports during migration

export const rootReducer = () => {
  console.warn('rootReducer is deprecated in v16.0.0');
  return {};
};

// Mock slice injection for compatibility
rootReducer.inject = () => console.warn('Slice injection is deprecated');

export interface LazyLoadedSlices {}

export default rootReducer;
