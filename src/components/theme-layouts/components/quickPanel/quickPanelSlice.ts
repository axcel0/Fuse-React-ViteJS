// Migration: Redux slice replaced with simplified compatibility layer
// This file provides compatibility exports during migration

const exampleData = {
	notes: [
		{
			id: 1,
			title: 'Best songs to listen while working',
			detail: 'Last edit: May 8th, 2015'
		},
		{
			id: 2,
			title: 'Useful subreddits',
			detail: 'Last edit: January 12th, 2015'
		}
	],
	events: [
		{
			id: 1,
			title: 'Group Meeting',
			detail: 'In 32 Minutes, Room 1B'
		},
		{
			id: 2,
			title: 'Public Beta Release',
			detail: '11:00 PM'
		},
		{
			id: 3,
			title: 'Dinner with David',
			detail: '17:30 PM'
		},
		{
			id: 4,
			title: 'Q&A Session',
			detail: '20:30 PM'
		}
	]
};

// Legacy action creators
export const removeEvents = () => {
	console.error('removeEvents action is deprecated. Use QuickPanel context instead');
	return { type: 'DEPRECATED' };
};

export const toggleQuickPanel = () => {
	console.error('toggleQuickPanel action is deprecated. Use QuickPanel context instead');
	return { type: 'DEPRECATED' };
};

export const openQuickPanel = () => {
	console.error('openQuickPanel action is deprecated. Use QuickPanel context instead');
	return { type: 'DEPRECATED' };
};

export const closeQuickPanel = () => {
	console.error('closeQuickPanel action is deprecated. Use QuickPanel context instead');
	return { type: 'DEPRECATED' };
};

// Legacy selectors (return static data)
export const selectQuickPanelData = () => exampleData;
export const selectQuickPanelOpen = () => false;

// Compatibility exports
export const quickPanelSlice = {
	actions: { removeEvents, toggleQuickPanel, openQuickPanel, closeQuickPanel },
	name: 'quickPanel'
};

export type dataSliceType = typeof quickPanelSlice;
export default {}; // Empty reducer for compatibility
