import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { FuseThemeOption } from '@fuse/core/FuseThemeSelector/ThemePreview';
import clsx from 'clsx';
import { useMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import useFuseSettings from '@fuse/core/FuseSettings/hooks/useFuseSettings';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { useFuseMessage } from '@fuse/core/FuseMessage/FuseMessageContext';
import useUser from '@auth/useUser';
import { useTheme } from '../theme/useTheme';
import type { ThemeMode } from '../theme/theme-system';

type LightDarkModeToggleProps = {
	className?: string;
	lightTheme: FuseThemeOption;
	darkTheme: FuseThemeOption;
	showSystemOption?: boolean;
};

function LightDarkModeToggle(props: LightDarkModeToggleProps) {
	const { className = '', lightTheme, darkTheme, showSystemOption = true } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { setSettings } = useFuseSettings();
	const { isGuest, updateUserSettings } = useUser();
	const { showMessage } = useFuseMessage();
	const { mode, resolvedTheme, setMode, isSystemMode } = useTheme();

	// Sync MUI theme with resolved theme from theme system
	useEffect(() => {
		if (resolvedTheme === 'light') {
			handleThemeSelect(lightTheme);
		} else {
			handleThemeSelect(darkTheme);
		}
	}, [resolvedTheme, lightTheme, darkTheme]);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelectionChange = (selection: ThemeMode) => {
		// Update theme mode - MUI theme will be synced by useEffect
		setMode(selection);
		handleClose();
	};

	async function handleThemeSelect(_theme: FuseThemeOption) {
		const _newSettings = setSettings({ theme: { ..._theme?.section } } as Partial<FuseSettingsConfigType>);

		if (!isGuest) {
			const updatedUserData = await updateUserSettings(_newSettings);

			if (updatedUserData) {
				showMessage({ message: 'User settings saved.' });
			}
		}
	}

	const getDisplayIcon = () => {
		if (isSystemMode) {
			return resolvedTheme === 'dark' 
				? <FuseSvgIcon>heroicons-outline:moon</FuseSvgIcon>
				: <FuseSvgIcon>heroicons-outline:sun</FuseSvgIcon>;
		}
		return resolvedTheme === 'light' 
			? <FuseSvgIcon>heroicons-outline:sun</FuseSvgIcon>
			: <FuseSvgIcon>heroicons-outline:moon</FuseSvgIcon>;
	};

	return (
		<>
			<IconButton
				aria-controls="light-dark-toggle-menu"
				aria-haspopup="true"
				onClick={handleClick}
				className={clsx('border border-divider', className)}
				title={`Current: ${mode === 'system' ? `System (${resolvedTheme})` : mode}`}
			>
				{getDisplayIcon()}
			</IconButton>
			<Menu
				id="light-dark-toggle-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem
					selected={mode === 'light'}
					onClick={() => handleSelectionChange('light')}
				>
					<FuseSvgIcon className="mr-8">heroicons-outline:sun</FuseSvgIcon>
					Light
				</MenuItem>
				<MenuItem
					selected={mode === 'dark'}
					onClick={() => handleSelectionChange('dark')}
				>
					<FuseSvgIcon className="mr-8">heroicons-outline:moon</FuseSvgIcon>
					Dark
				</MenuItem>
				{showSystemOption && (
					<MenuItem
						selected={mode === 'system'}
						onClick={() => handleSelectionChange('system')}
					>
						<FuseSvgIcon className="mr-8">heroicons-outline:computer-desktop</FuseSvgIcon>
						System
					</MenuItem>
				)}
			</Menu>
		</>
	);
}

export default LightDarkModeToggle;
