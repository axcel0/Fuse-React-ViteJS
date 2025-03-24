import { FuseThemeType } from '@fuse/core/FuseSettings/FuseSettings';
import { createTheme, getContrastRatio, Theme } from '@mui/material/styles';
import _ from 'lodash';
import { defaultThemeOptions, extendThemeWithMixins, mustHaveThemeOptions } from '@fuse/default-settings';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { darkPaletteText, lightPaletteText } from '@/configs/themesConfig';
import useFuseSettings from './useFuseSettings';

type Direction = 'ltr' | 'rtl';

// Function to generate the MUI theme
const generateMuiTheme = (theme: FuseThemeType, direction: Direction): Theme => {
	const mergedTheme = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions) as ThemeOptions;
	const themeOptions = {
		...mergedTheme,
		mixins: extendThemeWithMixins(mergedTheme),
		direction
	} as ThemeOptions;
	return createTheme(themeOptions);
};

// Custom hooks for selecting themes
export const useMainTheme = (): Theme => {
	const { data: current } = useFuseSettings();
	return generateMuiTheme(current.theme.main, current.direction);
};

export const useNavbarTheme = (): Theme => {
	const { data: current } = useFuseSettings();
	return generateMuiTheme(current.theme.navbar, current.direction);
};

export const useToolbarTheme = (): Theme => {
	const { data: current } = useFuseSettings();
	return generateMuiTheme(current.theme.toolbar, current.direction);
};

export const useFooterTheme = (): Theme => {
	const { data: current } = useFuseSettings();
	return generateMuiTheme(current.theme.footer, current.direction);
};

// Helper functions for theme mode changes
export const changeThemeMode = (theme: FuseThemeType, mode: 'dark' | 'light'): FuseThemeType => {
	const modes = {
		dark: {
			palette: {
				mode: 'dark',
				divider: 'rgba(241,245,249,.12)',
				background: {
					paper: '#1E2125',
					default: '#121212'
				},
				text: darkPaletteText
			}
		},
		light: {
			palette: {
				mode: 'light',
				divider: '#e2e8f0',
				background: {
					paper: '#FFFFFF',
					default: '#F7F7F7'
				},
				text: lightPaletteText
			}
		}
	};
	return _.merge({}, theme, modes[mode]);
};

// Custom hook for contrast theme
export const useContrastMainTheme = (bgColor: string): Theme => {
	const isDark = (color: string): boolean => getContrastRatio(color, '#ffffff') >= 3;
	const darkTheme = useMainThemeDark();
	const lightTheme = useMainThemeLight();

	return isDark(bgColor) ? darkTheme : lightTheme;
};

export const useMainThemeDark = (): Theme => {
	const { data: current } = useFuseSettings();
	return generateMuiTheme(changeThemeMode(current.theme.main, 'dark'), current.direction);
};

export const useMainThemeLight = (): Theme => {
	const { data: current } = useFuseSettings();
	return generateMuiTheme(changeThemeMode(current.theme.main, 'light'), current.direction);
};
