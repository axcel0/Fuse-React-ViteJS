import { useTheme } from 'src/hooks/useTheme';
import { Card, CardContent, Typography, Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

/**
 * Demo component showcasing Tailwind CSS v4 dark mode integration
 * with Material-UI components
 */
function DarkModeDemo() {
	const { theme, effectiveTheme, setTheme, toggleTheme, isDark: _isDark, isLight: _isLight, isSystem } = useTheme();

	return (
		<div className="p-1.5 space-y-1.5">
			{/* Header */}
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-0.5">
					Tailwind CSS v4 Dark Mode Demo
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Current theme: <span className="font-semibold">{theme}</span>
					{isSystem && <span> (resolved to {effectiveTheme})</span>}
				</p>
			</div>

			{/* Theme Controls */}
			<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
				<CardContent>
					<Typography
						variant="h6"
						className="mb-1 text-gray-900 dark:text-gray-100"
					>
						Theme Controls
					</Typography>
					<div className="flex gap-1 mb-1">
						<Button
							variant={theme === 'light' ? 'contained' : 'outlined'}
							onClick={() => setTheme('light')}
							startIcon={<FuseSvgIcon>heroicons-outline:sun</FuseSvgIcon>}
							className="bg-yellow-500 hover:bg-yellow-600 text-white"
						>
							Light
						</Button>
						<Button
							variant={theme === 'dark' ? 'contained' : 'outlined'}
							onClick={() => setTheme('dark')}
							startIcon={<FuseSvgIcon>heroicons-outline:moon</FuseSvgIcon>}
							className="bg-gray-800 hover:bg-gray-900 text-white"
						>
							Dark
						</Button>
						<Button
							variant={theme === 'system' ? 'contained' : 'outlined'}
							onClick={() => setTheme('system')}
							startIcon={<FuseSvgIcon>heroicons-outline:computer-desktop</FuseSvgIcon>}
							className="bg-blue-600 hover:bg-blue-700 text-white"
						>
							System
						</Button>
						<Button
							variant="outlined"
							onClick={toggleTheme}
							startIcon={<FuseSvgIcon>heroicons-outline:arrow-path</FuseSvgIcon>}
						>
							Toggle
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* UI Elements Demo */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
				{/* Colors Demo */}
				<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
					<CardContent>
						<Typography
							variant="h6"
							className="mb-1 text-gray-900 dark:text-gray-100"
						>
							Color Palette
						</Typography>
						<div className="space-y-0.75">
							<div className="p-0.75 bg-fuse-primary text-white rounded-sm">
								Primary Color (Fuse Custom)
							</div>
							<div className="p-0.75 bg-fuse-secondary text-gray-900 rounded-sm">
								Secondary Color (Fuse Custom)
							</div>
							<div className="p-0.75 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-sm">
								Background Surface
							</div>
							<div className="p-0.75 border border-fuse-border text-fuse-text-primary rounded-sm">
								Text with Custom Border
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Interactive Elements */}
				<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
					<CardContent>
						<Typography
							variant="h6"
							className="mb-1 text-gray-900 dark:text-gray-100"
						>
							Interactive Elements
						</Typography>
						<div className="space-y-0.75">
							<button className="w-full p-0.75 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-sm transition-colors">
								Hover Button
							</button>
							<div className="p-0.75 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 text-green-700 dark:text-green-300">
								<strong>Success:</strong> This is a success message that adapts to dark mode.
							</div>
							<div className="p-0.75 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300">
								<strong>Error:</strong> This is an error message that adapts to dark mode.
							</div>
							<div className="p-0.75 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 text-amber-700 dark:text-amber-300">
								<strong>Warning:</strong> This is a warning message that adapts to dark mode.
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Advanced Features */}
			<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
				<CardContent>
					<Typography
						variant="h6"
						className="mb-1 text-gray-900 dark:text-gray-100"
					>
						Advanced Dark Mode Features
					</Typography>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-1">
						<div className="text-center">
							<div className="w-4 h-4 mx-auto mb-0.5 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full flex items-center justify-center">
								<FuseSvgIcon className="text-white">heroicons-outline:sparkles</FuseSvgIcon>
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100">CSS Variables</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Custom CSS variables for seamless theming
							</p>
						</div>
						<div className="text-center">
							<div className="w-4 h-4 mx-auto mb-0.5 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-full flex items-center justify-center">
								<FuseSvgIcon className="text-white">heroicons-outline:device-phone-mobile</FuseSvgIcon>
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100">System Detection</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Automatic system preference detection
							</p>
						</div>
						<div className="text-center">
							<div className="w-4 h-4 mx-auto mb-0.5 bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 rounded-full flex items-center justify-center">
								<FuseSvgIcon className="text-white">heroicons-outline:bolt</FuseSvgIcon>
							</div>
							<h3 className="font-semibold text-gray-900 dark:text-gray-100">No FOUC</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Prevents flash of unstyled content
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Code Example */}
			<Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
				<CardContent>
					<Typography
						variant="h6"
						className="mb-1 text-gray-900 dark:text-gray-100"
					>
						Usage Example
					</Typography>
					<pre className="bg-gray-100 dark:bg-gray-900 p-1 rounded-sm text-sm overflow-x-auto">
						<code className="text-gray-900 dark:text-gray-100">
							{`// Using the theme hook
import { useTheme } from 'src/hooks/useTheme';

function MyComponent() {
  const { theme, isDark, setTheme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-1">
      <h1 className="text-gray-900 dark:text-gray-100">
        Current theme: {theme}
      </h1>
      <button 
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="bg-blue-600 hover:bg-blue-700 text-white p-0.5 rounded-sm"
      >
        Toggle Theme
      </button>
    </div>
  );
}`}
						</code>
					</pre>
				</CardContent>
			</Card>
		</div>
	);
}

export default DarkModeDemo;
