/**
 * Hero Icons to Lucide Icons Migration Helper
 *
 * This utility provides mappings and helpers for migrating from Hero Icons to Lucide Icons
 */

// Common icon mappings from Hero Icons to Lucide Icons
export const iconMappings = {
	// Navigation
	Bars3Icon: 'Menu',
	XMarkIcon: 'X',
	ChevronLeftIcon: 'ChevronLeft',
	ChevronRightIcon: 'ChevronRight',
	ChevronUpIcon: 'ChevronUp',
	ChevronDownIcon: 'ChevronDown',
	ArrowLeftIcon: 'ArrowLeft',
	ArrowRightIcon: 'ArrowRight',
	ArrowUpIcon: 'ArrowUp',
	ArrowDownIcon: 'ArrowDown',

	// Actions
	PlusIcon: 'Plus',
	MinusIcon: 'Minus',
	PencilIcon: 'Pencil',
	TrashIcon: 'Trash2',
	EyeIcon: 'Eye',
	EyeSlashIcon: 'EyeOff',
	MagnifyingGlassIcon: 'Search',
	Cog6ToothIcon: 'Settings',
	Cog8ToothIcon: 'Settings',

	// Communication
	ChatBubbleLeftIcon: 'MessageCircle',
	EnvelopeIcon: 'Mail',
	PhoneIcon: 'Phone',
	BellIcon: 'Bell',
	BellSlashIcon: 'BellOff',

	// Media
	PhotoIcon: 'Image',
	VideoCameraIcon: 'Video',
	MicrophoneIcon: 'Mic',
	SpeakerWaveIcon: 'Volume2',
	SpeakerXMarkIcon: 'VolumeX',

	// Files
	DocumentIcon: 'File',
	FolderIcon: 'Folder',
	FolderOpenIcon: 'FolderOpen',
	CloudArrowUpIcon: 'CloudUpload',
	CloudArrowDownIcon: 'CloudDownload',
	ArrowDownTrayIcon: 'Download',
	ArrowUpTrayIcon: 'Upload',

	// Status
	CheckIcon: 'Check',
	XCircleIcon: 'XCircle',
	CheckCircleIcon: 'CheckCircle',
	ExclamationTriangleIcon: 'AlertTriangle',
	InformationCircleIcon: 'Info',
	QuestionMarkCircleIcon: 'HelpCircle',

	// User & People
	UserIcon: 'User',
	UsersIcon: 'Users',
	UserPlusIcon: 'UserPlus',
	UserMinusIcon: 'UserMinus',
	UserCircleIcon: 'UserCircle',

	// Business
	HomeIcon: 'Home',
	BuildingOfficeIcon: 'Building',
	ShoppingCartIcon: 'ShoppingCart',
	CreditCardIcon: 'CreditCard',
	BanknotesIcon: 'DollarSign',
	ChartBarIcon: 'BarChart3',
	ChartPieIcon: 'PieChart',

	// Technology
	ComputerDesktopIcon: 'Monitor',
	DevicePhoneMobileIcon: 'Smartphone',
	DeviceTabletIcon: 'Tablet',
	WifiIcon: 'Wifi',
	WifiOffIcon: 'WifiOff',
	ServerIcon: 'Server',
	DatabaseIcon: 'Database',

	// Time & Calendar
	CalendarIcon: 'Calendar',
	CalendarDaysIcon: 'CalendarDays',
	ClockIcon: 'Clock',
	SunIcon: 'Sun',
	MoonIcon: 'Moon',

	// Interface
	Squares2X2Icon: 'Grid2X2',
	TableCellsIcon: 'Table',
	ListBulletIcon: 'List',
	AdjustmentsHorizontalIcon: 'Settings2',
	FunnelIcon: 'Filter',
	MagnifyingGlassPlusIcon: 'ZoomIn',
	MagnifyingGlassMinusIcon: 'ZoomOut',
};

/**
 * Get Lucide icon name from Hero icon name
 */
export function getLucideIconName(heroIconName: string): string {
	return iconMappings[heroIconName as keyof typeof iconMappings] || heroIconName;
}

/**
 * Common icon sizes used in the application
 */
export const iconSizes = {
	xs: 12,
	sm: 16,
	md: 20,
	lg: 24,
	xl: 32,
	'2xl': 48,
} as const;

/**
 * Helper to get consistent icon props
 */
export function getIconProps(size: keyof typeof iconSizes = 'md', className?: string) {
	return {
		size: iconSizes[size],
		className: className || '',
	};
}
