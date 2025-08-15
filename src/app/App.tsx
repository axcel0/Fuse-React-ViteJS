import FuseLayout from '@fuse/core/FuseLayout';
import { SnackbarProvider } from 'notistack';
import themeLayouts from 'src/components/theme-layouts/themeLayouts';
import FuseSettingsProvider from '@fuse/core/FuseSettings/FuseSettingsProvider';
import { I18nProvider } from '@i18n/I18nProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS } from 'date-fns/locale/en-US';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ErrorBoundary from '@fuse/utils/ErrorBoundary';
import Authentication from '@auth/Authentication';
import MainThemeProvider from '../contexts/MainThemeProvider';
import { PageTitleProvider } from '../contexts/PageTitleContext';
import routes from '@/configs/routesConfig';
import AppContext from '@/contexts/AppContext';
import { FuseMessageProvider } from '@fuse/core/FuseMessage/FuseMessageContext';
import { FuseDialogProvider } from '@fuse/core/FuseDialog/FuseDialogContext';
import { NavbarProvider } from 'src/components/theme-layouts/components/navbar/NavbarContext';
import { QuickPanelProvider } from 'src/components/theme-layouts/components/quickPanel/QuickPanelContext';
import NetworkDebugger from '../components/debug/NetworkDebugger';

/**
 * The main App component.
 */
function App() {
	const AppContextValue = {
		routes
	};

	return (
		<ErrorBoundary>
			<AppContext value={AppContextValue}>
				{/* Date Picker Localization Provider */}
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={enUS}
				>
					<Authentication>
						<FuseSettingsProvider>
							<I18nProvider>
								{/* Theme Provider */}
								<MainThemeProvider>
									{/* Notistack Notification Provider */}
									<SnackbarProvider
										maxSnack={5}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right'
										}}
										classes={{
											containerRoot: 'bottom-0 right-0 mb-13 md:mb-17 mr-2 lg:mr-20 z-99'
										}}
									>
										<FuseMessageProvider>
											<FuseDialogProvider>
												<PageTitleProvider>
													<QuickPanelProvider>
														<NavbarProvider>
															<FuseLayout layouts={themeLayouts} />
															{/* Network debugger untuk dev tunnel performance monitoring - Development Only */}
															{import.meta.env.DEV && <NetworkDebugger />}
														</NavbarProvider>
													</QuickPanelProvider>
												</PageTitleProvider>
											</FuseDialogProvider>
										</FuseMessageProvider>
									</SnackbarProvider>
								</MainThemeProvider>
							</I18nProvider>
						</FuseSettingsProvider>
					</Authentication>
				</LocalizationProvider>
			</AppContext>
		</ErrorBoundary>
	);
}

export default App;
