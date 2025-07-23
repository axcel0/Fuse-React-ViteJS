// Migration: Redux removed, this file provides compatibility exports
// This file provides compatibility exports during migration

export const generateReducersFromSlices = () => {
  console.warn('generateReducersFromSlices is deprecated in v16.0.0');
  return {};
};

export default generateReducersFromSlices;
