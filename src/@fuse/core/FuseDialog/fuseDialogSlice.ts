// Migration: Redux slice replaced with Context - see FuseDialogContext.tsx
// This file provides compatibility exports during migration

import { 
  useFuseDialog,
  selectFuseDialogState,
  selectFuseDialogProps 
} from './FuseDialogContext';

// Legacy action creators (now use context methods directly)
export const openDialog = (payload: { children: any }) => {
  console.warn('openDialog action is deprecated. Use useFuseDialog().openDialog() instead');
  return { type: 'DEPRECATED', payload };
};

export const closeDialog = () => {
  console.warn('closeDialog action is deprecated. Use useFuseDialog().closeDialog() instead');
  return { type: 'DEPRECATED' };
};

// Re-export selectors and hooks
export { 
  useFuseDialog,
  selectFuseDialogState, 
  selectFuseDialogProps 
};

// Compatibility exports
export const fuseDialogSlice = {
  actions: { openDialog, closeDialog },
  name: 'fuseDialog'
};

export type dialogSliceType = typeof fuseDialogSlice;
export default {}; // Empty reducer for compatibility
