import React, { useState } from 'react';
import { cn } from '../design-system/lib/utils';

interface ModernNavbarProps {
	className?: string;
	children?: React.ReactNode;
}

const ModernNavbar: React.FC<ModernNavbarProps> = ({ className, children }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<>
			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={toggleMobileMenu}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					'fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300',
					isCollapsed ? 'w-16' : 'w-64',
					isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
					className
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-1 border-b border-neutral-200 dark:border-neutral-800">
					{!isCollapsed && (
						<div className="flex items-center space-x-0.5">
							<div className="w-2 h-2 bg-primary-500 rounded-lg flex items-center justify-center">
								<span className="text-white text-sm font-bold">F</span>
							</div>
							<span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Fuse</span>
						</div>
					)}

					{/* Desktop Toggle Button */}
					<button
						onClick={toggleSidebar}
						className={cn(
							'hidden lg:flex items-center justify-center w-8 h-8 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors',
							isCollapsed && 'mx-auto'
						)}
						aria-label="Toggle sidebar"
					>
						<svg
							className={cn(
								'w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform duration-200',
								isCollapsed && 'rotate-180'
							)}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
				</div>

				{/* Navigation Content */}
				<div className="flex-1 overflow-y-auto p-1">
					{/* Navigation Items */}
					<nav className="space-y-0.5">
						<NavItem
							icon="🏠"
							label="Dashboard"
							href="/"
							isCollapsed={isCollapsed}
						/>
						<NavItem
							icon="📊"
							label="Analytics"
							href="/analytics"
							isCollapsed={isCollapsed}
						/>
						<NavItem
							icon="👥"
							label="Users"
							href="/users"
							isCollapsed={isCollapsed}
						/>
						<NavItem
							icon="⚙️"
							label="Settings"
							href="/settings"
							isCollapsed={isCollapsed}
						/>
						<NavItem
							icon="🎨"
							label="Design System"
							href="/design-system-demo"
							isCollapsed={isCollapsed}
						/>
					</nav>
				</div>

				{/* Footer */}
				<div className="p-1 border-t border-neutral-200 dark:border-neutral-800">
					{!isCollapsed ? (
						<div className="flex items-center space-x-0.75">
							<div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full flex items-center justify-center">
								<span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">U</span>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
									John Doe
								</p>
								<p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
									john@example.com
								</p>
							</div>
						</div>
					) : (
						<div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto">
							<span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">U</span>
						</div>
					)}
				</div>
			</aside>

			{/* Mobile Menu Button */}
			<button
				onClick={toggleMobileMenu}
				className="fixed top-1 left-1 z-50 lg:hidden w-2.5 h-2.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md shadow-xs flex items-center justify-center"
				aria-label="Toggle mobile menu"
			>
				<svg
					className="w-1.25 h-1.25 text-neutral-600 dark:text-neutral-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>

			{/* Main Content Area */}
			<main
				className={cn(
					'transition-all duration-300 min-h-screen bg-neutral-50 dark:bg-neutral-900',
					isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
				)}
			>
				{children}
			</main>
		</>
	);
};

interface NavItemProps {
	icon: string;
	label: string;
	href: string;
	isCollapsed: boolean;
	isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, isCollapsed, isActive = false }) => {
	return (
		<a
			href={href}
			className={cn(
				'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
				isActive
					? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
					: 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
				isCollapsed && 'justify-center'
			)}
			title={isCollapsed ? label : undefined}
		>
			<span className="text-lg">{icon}</span>
			{!isCollapsed && <span>{label}</span>}
		</a>
	);
};

export default ModernNavbar;
