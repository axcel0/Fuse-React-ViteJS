import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { FuseThemesType } from '@fuse/core/FuseSettings/FuseSettings';

export type FuseThemeOption = {
	id: string;
	section: FuseThemesType;
};

type ThemePreviewProps = {
	className?: string;
	onSelect?: (T: FuseThemeOption) => void;
	theme: FuseThemeOption;
};

/**
 * The ThemePreview component is responsible for rendering a preview of a theme scheme.
 * It uses various MUI components to render the preview.
 * The component is memoized to prevent unnecessary re-renders.
 */
function ThemePreview(props: ThemePreviewProps) {
	const { theme, className, onSelect = () => {} } = props;
	const { section, id } = theme;

	const { navbar, toolbar, footer, main } = section;

	return (
		<div className={clsx(className, 'w-full min-h-full ')}>
			<button
				className={clsx(
					'flex p-0 h-40 relative w-full cursor-pointer overflow-hidden rounded-sm text-left font-medium shadow-sm transition-all hover:shadow-lg items-stretch hover:scale-105 duration-200 ease-in-out',
					{
						'bg-white': id === 'default',
						'bg-gray-700': id !== 'default'
					}
				)}
				style={{
					backgroundColor: main.palette.background.default,
					color: main.palette.text.primary
				}}
				onClick={() => {
					onSelect(theme);
				}}
				type="button"
			>
				<div
					className="flex flex-col w-1/3 min-h-full p-0.25 border-r-1 border-gray-700"
					style={{
						backgroundColor: navbar.palette.background.default,
						color: navbar.palette.text.primary
					}}
				>
					<span className="text-sm">Navbar</span>
				</div>

				<div className="flex flex-col w-2/3">
					<div
						className="w-full px-0.25 py-0.25 border-b-1 border-gray-700"
						style={{
							backgroundColor: toolbar.palette.background.default,
							color: toolbar.palette.text.primary
						}}
					>
						<span className="text-sm">Toolbar</span>
					</div>

					<div className="flex flex-1 flex-col w-full">
						<div
							className="relative h-2.75 w-full px-0.25"
							style={{
								backgroundColor: main.palette.primary.main,
								color: main.palette.primary.contrastText
							}}
						>
							<span className="text-sm">Header</span>

							<div
								className="absolute bottom-0 right-0 mb-0.625 mr-0.5 flex h-1.5 w-1.5 items-center justify-center rounded-full text-xs shadow-1 z-10"
								style={{
									backgroundColor: main.palette.secondary.main,
									color: main.palette.secondary.contrastText
								}}
							>
								<span className="">S</span>
							</div>
						</div>

						<div className="-mt-1.5 flex-1 w-full pl-0.25 pr-0.25">
							<div
								className="relative w-full h-full rounded-xs p-0.25 shadow-1"
								style={{
									backgroundColor: main.palette.background.paper,
									color: main.palette.text.primary
								}}
							>
								<span className="text-sm">Paper</span>
							</div>
						</div>

						<div className="w-full p-0.25">
							<span className="text-sm">Background</span>
						</div>
					</div>

					<div
						className="w-full px-0.5 py-0.25 border-t-1 border-gray-700"
						style={{
							backgroundColor: footer.palette.background.default,
							color: footer.palette.text.primary
						}}
					>
						<span className="text-sm">Footer</span>
					</div>
				</div>
			</button>
			<Typography className="mt-0.25 w-full text-center font-semibold">{id}</Typography>
		</div>
	);
}

export default ThemePreview;
