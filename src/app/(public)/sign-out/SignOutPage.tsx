import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@fuse/core/Link';

/**
 * The sign out page.
 */
function SignOutPage() {
	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
			<Paper className="flex min-h-full w-full items-center rounded-none px-1 py-2 sm:min-h-auto sm:w-auto sm:rounded-xl sm:p-3 sm:shadow-xs">
				<div className="flex flex-col items-center mx-auto w-full max-w-20 sm:mx-0 sm:w-20">
					<img
						className="mx-auto w-3"
						src="/assets/images/logo/logo.svg"
						alt="logo"
					/>

					<Typography className="mt-2 text-center text-4xl font-extrabold leading-[1.25] tracking-tight">
						You have signed out!
					</Typography>

					<Typography
						className="mt-2 text-md font-medium"
						color="text.secondary"
					>
						<span>Return to</span>
						<Link
							className="text-primary-500 ml-0.25 hover:underline"
							to="/sign-in"
						>
							sign in
						</Link>
					</Typography>
				</div>
			</Paper>
		</div>
	);
}

export default SignOutPage;
