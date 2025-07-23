// Migration: Empty Redux slice file - compatibility layer
// This file provides compatibility exports during migration

// Legacy action creators
export const navbarToggle = () => {
  console.warn('navbarToggle action is deprecated. Use Navbar context instead');
  return { type: 'DEPRECATED' };
};

export const navbarToggleMobile = () => {
  console.warn('navbarToggleMobile action is deprecated. Use Navbar context instead');
  return { type: 'DEPRECATED' };
};

export const navbarCloseMobile = () => {
  console.warn('navbarCloseMobile action is deprecated. Use Navbar context instead');
  return { type: 'DEPRECATED' };
};

export const navbarCloseFolded = () => {
  console.warn('navbarCloseFolded action is deprecated. Use Navbar context instead');
  return { type: 'DEPRECATED' };
};

export const navbarOpenFolded = () => {
  console.warn('navbarOpenFolded action is deprecated. Use Navbar context instead');
  return { type: 'DEPRECATED' };
};

export const resetNavbar = () => {
  console.warn('resetNavbar action is deprecated. Use Navbar context instead');
  return { type: 'DEPRECATED' };
};

// Legacy selectors (return static data for compatibility)
export const selectFuseNavbar = (state: any) => ({
  open: true,
  mobileOpen: false,
  foldedOpen: false
});

// Compatibility exports
export const navbarSlice = {
  actions: { 
    navbarToggle, 
    navbarToggleMobile, 
    navbarCloseMobile,
    navbarCloseFolded,
    navbarOpenFolded,
    resetNavbar
  },
  name: 'navbar'
};

export default {}; // Empty reducer for compatibility