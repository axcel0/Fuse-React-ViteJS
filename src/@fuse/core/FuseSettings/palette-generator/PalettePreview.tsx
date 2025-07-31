import clsx from 'clsx';
import Box from '@mui/material/Box';
import type { Palette } from '@mui/material/styles';
import { PartialDeep } from 'type-fest';

/**
 * Props for PalettePreview component
 */
type PalettePreviewProps = {
	className?: string;
	palette: PartialDeep<Palette>;
};

/**
 * PalettePreview component
 */
function PalettePreview(props: PalettePreviewProps) {
	const { palette, className } = props;

	return (
		<Box
			className={clsx('relative w-50 overflow-hidden rounded-md text-left font-bold shadow-sm', className)}
			sx={{
				backgroundColor: palette.background.default,
				color: palette.text.primary
			}}
			type="button"
			component="button"
		>
			<Box
				className="relative h-3.5 w-full px-0.5 pt-0.5"
				sx={{
					backgroundColor: palette.primary.main,
					color: () => palette.primary.contrastText || palette.getContrastText(palette.primary.main)
				}}
			>
				<span className="text-md">Header (Primary)</span>

				<Box
					className="absolute bottom-0 right-0 -mb-0.625 mr-0.25 flex h-1.25 w-1.25 items-center justify-center rounded-full text-xs shadow-xs"
					sx={{
						backgroundColor: palette.secondary.main,
						color: () => palette.secondary.contrastText || palette.getContrastText(palette.secondary.main)
					}}
				>
					<span>S</span>
				</Box>
			</Box>
			<div className="-mt-1.5 w-full pl-0.5 pr-1.75">
				<Box
					className="relative h-6 w-full rounded-xs p-0.5 shadow-xs"
					sx={{
						backgroundColor: palette.background.paper,
						color: palette.text.primary
					}}
				>
					<span className="text-md opacity-75">Paper</span>
				</Box>
			</div>

			<div className="w-full p-0.5">
				<span className="text-md opacity-75">Background</span>
			</div>

			{/* <pre className="language-js p-1.5 w-25">{JSON.stringify(palette, null, 2)}</pre> */}
		</Box>
	);
}

export default PalettePreview;
