import React from 'react';
import Button from '../../design-system/components/Button';
import Card, {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '../../design-system/components/Card';
import Input, { Textarea, Select } from '../../design-system/components/Input';
import ModernNavbar from '../../components/ModernNavbar';
import { useTheme } from '../../hooks/useTheme';

const DesignSystemDemo: React.FC = () => {
	const { theme, effectiveTheme, setTheme, isDark, isLight: _isLight, isSystem } = useTheme();

	const getSystemIcon = () => {
		if (isSystem) {
			return isDark ? '🌙' : '☀️';
		}

		return isDark ? '🌙' : '☀️';
	};

	return (
		<ModernNavbar>
			<div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
				<div className="container mx-auto p-8 space-y-8">
					{/* Header */}
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Design System Demo</h1>
							<p className="text-neutral-600 dark:text-neutral-400 mt-2">
								Current theme: {theme} {isSystem && `(${effectiveTheme})`}
							</p>
						</div>

						{/* Theme Controls */}
						<div className="flex gap-2">
							<Button
								variant={theme === 'light' ? 'primary' : 'outline'}
								size="sm"
								onClick={() => setTheme('light')}
								leftIcon="☀️"
							>
								Light
							</Button>
							<Button
								variant={theme === 'dark' ? 'primary' : 'outline'}
								size="sm"
								onClick={() => setTheme('dark')}
								leftIcon="🌙"
							>
								Dark
							</Button>
							<Button
								variant={theme === 'system' ? 'primary' : 'outline'}
								size="sm"
								onClick={() => setTheme('system')}
								leftIcon={getSystemIcon()}
							>
								System
							</Button>
						</div>
					</div>

					{/* Theme Status Card */}
					<Card variant="outlined">
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
								<div>
									<h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Theme Mode</h3>
									<p className="text-neutral-600 dark:text-neutral-400">{theme}</p>
								</div>
								<div>
									<h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Effective Theme</h3>
									<p className="text-neutral-600 dark:text-neutral-400">{effectiveTheme}</p>
								</div>
								<div>
									<h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Status</h3>
									<p className="text-neutral-600 dark:text-neutral-400">
										{isSystem ? 'Following System' : 'Manual Override'}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Buttons Section */}
					<Card>
						<CardHeader>
							<CardTitle>Buttons</CardTitle>
							<CardDescription>Button variants in different sizes and states</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{/* Primary Buttons */}
								<div>
									<h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Primary Buttons</h4>
									<div className="flex flex-wrap gap-2">
										<Button variant="primary" size="sm">
											Small
										</Button>
										<Button variant="primary" size="md">
											Medium
										</Button>
										<Button variant="primary" size="lg">
											Large
										</Button>
										<Button variant="primary" disabled>
											Disabled
										</Button>
									</div>
								</div>

								{/* Secondary Buttons */}
								<div>
									<h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Secondary Buttons</h4>
									<div className="flex flex-wrap gap-2">
										<Button variant="secondary">Secondary</Button>
										<Button variant="outline">Outline</Button>
										<Button variant="ghost">Ghost</Button>
										<Button variant="danger">Danger</Button>
									</div>
								</div>

								{/* Buttons with Icons */}
								<div>
									<h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
										Buttons with Icons
									</h4>
									<div className="flex flex-wrap gap-2">
										<Button variant="primary" leftIcon="📄">
											New Document
										</Button>
										<Button variant="outline" rightIcon="📤">
											Export
										</Button>
										<Button variant="ghost" leftIcon="⚙️" rightIcon="🔽">
											Settings
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Cards Section */}
					<Card>
						<CardHeader>
							<CardTitle>Cards</CardTitle>
							<CardDescription>Card variants with different content layouts</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{/* Elevated Card */}
								<Card variant="elevated" padding="md">
									<CardHeader>
										<CardTitle>Elevated Card</CardTitle>
										<CardDescription>This card has elevation shadow</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">
											Card content goes here. This demonstrates the elevated variant with shadow.
										</p>
									</CardContent>
									<CardFooter>
										<Button variant="primary" size="sm">
											Action
										</Button>
									</CardFooter>
								</Card>

								{/* Outlined Card */}
								<Card variant="outlined" padding="md">
									<CardHeader>
										<CardTitle>Outlined Card</CardTitle>
										<CardDescription>This card has a border</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">
											Card content goes here. This demonstrates the outlined variant with border.
										</p>
									</CardContent>
									<CardFooter>
										<Button variant="outline" size="sm">
											Action
										</Button>
									</CardFooter>
								</Card>

								{/* Filled Card */}
								<Card variant="filled" padding="md">
									<CardHeader>
										<CardTitle>Filled Card</CardTitle>
										<CardDescription>This card has a filled background</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-neutral-600 dark:text-neutral-400">
											Card content goes here. This demonstrates the filled variant with background.
										</p>
									</CardContent>
									<CardFooter>
										<Button variant="ghost" size="sm">
											Action
										</Button>
									</CardFooter>
								</Card>
							</div>
						</CardContent>
					</Card>

					{/* Forms Section */}
					<Card>
						<CardHeader>
							<CardTitle>Form Components</CardTitle>
							<CardDescription>Input, textarea, and select components with various states</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Left Column */}
								<div className="space-y-4">
									<Input
										label="Email Address"
										type="email"
										placeholder="Enter your email"
										helperText="We'll never share your email"
										fullWidth
									/>

									<Input label="Password" type="password" placeholder="Enter your password" startIcon="🔒" fullWidth />

									<Input
										label="Search"
										type="search"
										placeholder="Search anything..."
										startIcon="🔍"
										endIcon="⌘K"
										fullWidth
									/>

									<Input
										label="Error Example"
										type="text"
										placeholder="This field has an error"
										error="This field is required"
										fullWidth
									/>
								</div>

								{/* Right Column */}
								<div className="space-y-4">
									<Select
										label="Country"
										placeholder="Select a country"
										fullWidth
										options={[
											{ value: 'us', label: 'United States' },
											{ value: 'ca', label: 'Canada' },
											{ value: 'uk', label: 'United Kingdom' },
											{ value: 'au', label: 'Australia' },
										]}
									/>

									<Textarea
										label="Message"
										placeholder="Enter your message here..."
										helperText="Maximum 500 characters"
										rows={4}
										fullWidth
									/>

									<div className="grid grid-cols-2 gap-2">
										<Input label="Size Small" size="sm" placeholder="Small input" fullWidth />
										<Input label="Size Large" size="lg" placeholder="Large input" fullWidth />
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<div className="flex gap-2">
								<Button variant="primary">Submit Form</Button>
								<Button variant="outline">Reset</Button>
							</div>
						</CardFooter>
					</Card>

					{/* Interactive Card */}
					<Card interactive variant="outlined" onClick={() => alert('Card clicked!')}>
						<CardContent>
							<div className="text-center py-8">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Interactive Card</h3>
								<p className="text-neutral-600 dark:text-neutral-400">
									Click anywhere on this card to trigger an action
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</ModernNavbar>
	);
};

export default DesignSystemDemo;
