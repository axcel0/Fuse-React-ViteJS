import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react'
		}),
		tsconfigPaths({
			parseNative: false
		}),
		svgrPlugin(),
		{
			name: 'custom-hmr-control',
			handleHotUpdate({ file, server }) {
				if (file.includes('src/app/configs/')) {
					server.ws.send({
						type: 'full-reload'
					});
					return [];
				}
			}
		},
		// Bundle analyzer - generates stats.html after build
		visualizer({
			filename: 'build/stats.html',
			open: false,
			gzipSize: true,
			brotliSize: true,
		}),
	],
	build: {
		outDir: 'build',
		target: 'es2022',
		cssTarget: 'chrome111',
		// Increase chunk size warning limit
		chunkSizeWarningLimit: 600,
		// Add manual chunking for better code splitting
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Vendor chunks - more granular splitting
					if (id.includes('node_modules')) {
						// React ecosystem (largest chunk - split further)
						if (id.includes('react-dom')) {
							return 'vendor-react-dom';
						}
						if (id.includes('react-router')) {
							return 'vendor-router';
						}
						if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-router')) {
							return 'vendor-react';
						}
						
						// MUI ecosystem
						if (id.includes('@mui/material') || id.includes('@mui/system')) {
							return 'vendor-mui-core';
						}
						if (id.includes('@mui/icons-material')) {
							return 'vendor-mui-icons';
						}
						if (id.includes('@mui/')) {
							return 'vendor-mui-extras';
						}
						
						// Emotion
						if (id.includes('@emotion')) {
							return 'vendor-emotion';
						}
						
						// Utilities
						if (id.includes('lodash') || id.includes('date-fns') || id.includes('clsx')) {
							return 'vendor-utils';
						}
						
						// AWS/Firebase (large cloud libraries)
						if (id.includes('@aws-amplify') || id.includes('aws-amplify')) {
							return 'vendor-aws';
						}
						if (id.includes('firebase')) {
							return 'vendor-firebase';
						}
						
						// MSW (Mock Service Worker - development/testing)
						if (id.includes('msw')) {
							return 'vendor-msw';
						}
						
						// TinyMCE (Rich text editor - large)
						if (id.includes('tinymce')) {
							return 'vendor-tinymce';
						}
						
						// Form libraries
						if (id.includes('react-hook-form') || id.includes('@hookform')) {
							return 'vendor-forms';
						}
						
						// Query/State management
						if (id.includes('@tanstack')) {
							return 'vendor-tanstack';
						}
						
						// Animation libraries
						if (id.includes('framer-motion') || id.includes('motion')) {
							return 'vendor-animation';
						}
						
						// Internationalization
						if (id.includes('i18next') || id.includes('react-i18next')) {
							return 'vendor-i18n';
						}
						
						// Styling libraries
						if (id.includes('styled-components') || id.includes('stylis')) {
							return 'vendor-styling';
						}
						
						// All other smaller vendor dependencies
						return 'vendor-misc';
					}
					
					// Feature chunks based on file paths
					if (id.includes('src/@auth/')) {
						return 'chunk-auth';
					}
					if (id.includes('src/@i18n/')) {
						return 'chunk-i18n';
					}
					if (id.includes('src/@fuse/')) {
						return 'chunk-fuse';
					}
					if (id.includes('src/components/theme-layouts/')) {
						return 'chunk-layouts';
					}
					if (id.includes('src/app/') && !id.includes('src/app/App.tsx')) {
						return 'chunk-pages';
					}
				},
				// Ensure font files are copied correctly
				assetFileNames: (assetInfo) => {
					const info = assetInfo.name?.split('.') || [];
					const extType = info[info.length - 1];
					
					// Handle font files specifically
					if (/woff2?|ttf|otf|eot/.test(extType)) {
						return `assets/fonts/[name].[hash].[ext]`;
					}
					
					// Handle other assets
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/.test(extType)) {
						return `assets/images/[name].[hash].[ext]`;
					}
					
					return `assets/[name].[hash].[ext]`;
				}
			}
		}
	},
	// Ensure assets are properly processed
	assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.otf'],
	server: {
		host: '0.0.0.0',
		open: true,
		strictPort: false,
		port: 3000
	},
	define: {
		'import.meta.env.VITE_PORT': JSON.stringify(process.env.PORT || 3000),
		global: 'window'
	},
	resolve: {
		alias: {
			'@': '/src',
			'@fuse': '/src/@fuse',
			'@history': '/src/@history',
			'@lodash': '/src/@lodash',
			'@mock-api': '/src/@mock-api',
			'@schema': '/src/@schema',
			'app/store': '/src/app/store',
			'app/shared-components': '/src/app/shared-components',
			'app/configs': '/src/app/configs',
			'app/theme-layouts': '/src/app/theme-layouts',
			'app/AppContext': '/src/app/AppContext'
		}
	},
	optimizeDeps: {
		include: [
			'@mui/icons-material',
			'@mui/material',
			'@mui/base',
			'@mui/styles',
			'@mui/system',
			'@mui/utils',
			'@emotion/cache',
			'@emotion/react',
			'@emotion/styled',
			'date-fns',
			'lodash'
		],
		exclude: [],
		esbuildOptions: {
			loader: {
				'.js': 'jsx'
			}
		}
	}
});
