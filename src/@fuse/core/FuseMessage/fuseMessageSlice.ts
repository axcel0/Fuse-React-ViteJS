// Migration: Redux slice replaced with Context - see FuseMessageContext.tsx
// This file provides compatibility exports during migration

import { 
  useFuseMessage,
  selectFuseMessageState,
  selectFuseMessageOptions 
} from './FuseMessageContext';

// Legacy action creators (now use context methods directly)
export const showMessage = (options: any) => {
  console.warn('showMessage action is deprecated. Use useFuseMessage().showMessage() instead');
  return { type: 'DEPRECATED', payload: options };
};

export const hideMessage = () => {
  console.warn('hideMessage action is deprecated. Use useFuseMessage().hideMessage() instead');
  return { type: 'DEPRECATED' };
};

// Re-export selectors and hooks
export { 
  useFuseMessage,
  selectFuseMessageState, 
  selectFuseMessageOptions 
};

// Compatibility exports
export const fuseMessageSlice = {
  actions: { showMessage, hideMessage },
  name: 'fuseMessage'
};

export type messageSliceType = typeof fuseMessageSlice;
export default {}; // Empty reducer for compatibility
