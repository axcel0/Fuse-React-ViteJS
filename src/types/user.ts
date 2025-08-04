/**
 * User interface for consistent typing across components
 * This helps avoid TypeScript errors and provides better type safety
 */
export interface UserData {
	id?: string;
	displayName?: string;
	name?: string;
	email?: string;
	photoURL?: string;
	avatar?: string;
	role?: string[] | string;
	settings?: Record<string, any>;
	shortcuts?: string[];
}

export interface UserContextType {
	data: UserData | null;
	isGuest: boolean;
	isLoading?: boolean;
	signOut?: () => Promise<void> | void;
	updateUser?: (updates: Partial<UserData>) => Promise<UserData | undefined>;
	updateUserSettings?: (newSettings: UserData['settings']) => Promise<UserData['settings'] | undefined>;
}

/**
 * Helper function to safely extract user display data
 */
export function getUserDisplayData(user: UserContextType | null | undefined) {
	const userData = user?.data;
	const userDisplayName = userData?.displayName || userData?.name || '';
	const userEmail = userData?.email || '';
	const userPhotoURL = userData?.photoURL || userData?.avatar || '';
	const isGuest = user?.isGuest ?? true;
	
	return {
		displayName: userDisplayName,
		email: userEmail,
		photoURL: userPhotoURL,
		isGuest,
		initials: userDisplayName ? userDisplayName.charAt(0).toUpperCase() : 'G'
	};
}
