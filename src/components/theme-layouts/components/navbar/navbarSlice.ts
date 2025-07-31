// Migration: Empty Redux slice file - compatibility layer
// This file provides compatibility exports during migration

// Legacy action creators
export const navbarToggle = () => {
	console.error('navbarToggle action is deprecated. Use Navbar context instead');
	return { type: 'DEPRECATED' };
};

export const navbarToggleMobile = () => {
	console.error('navbarToggleMobile action is deprecated. Use Navbar context instead');
	return { type: 'DEPRECATED' };
};

export const navbarCloseMobile = () => {
	console.error('navbarCloseMobile action is deprecated. Use Navbar context instead');
	return { type: 'DEPRECATED' };
};

export const navbarCloseFolded = () => {
	console.error('navbarCloseFolded action is deprecated. Use Navbar context instead');
	return { type: 'DEPRECATED' };
};

export const navbarOpenFolded = () => {
	console.error('navbarOpenFolded action is deprecated. Use Navbar context instead');
	return { type: 'DEPRECATED' };
};

export const resetNavbar = () => {
	console.error('resetNavbar action is deprecated. Use Navbar context instead');
	return { type: 'DEPRECATED' };
};

// Legacy selectors (return static data for compatibility)
export const selectFuseNavbar = (state: unknown) => ({
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
