import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { z } from 'zod';
import _ from 'lodash';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@fuse/core/Link';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useJwtAuth from '../useJwtAuth';
import { FetchApiError } from '@/utils/apiFetch';
import { JwtSignInPayload } from '../JwtAuthProvider';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').min(1, 'You must enter an email'),
	password: z
		.string()
		.min(4, 'Password is too short - must be at least 4 chars.')
		.min(1, 'Please enter your password.')
});

type FormType = JwtSignInPayload & {
	remember?: boolean;
};

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function JwtSignInForm() {
	const { signIn } = useJwtAuth();
	const theme = useTheme();
	const isDark = theme.palette.mode === 'dark';

	const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		setValue('email', 'admin@fusetheme.com', {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('password', '5;4+0IOx:\\Dy', {
			shouldDirty: true,
			shouldValidate: true
		});
	}, [setValue]);

	function onSubmit(formData: FormType) {
		const { email, password } = formData;

		signIn({
			email,
			password
		}).catch((error: FetchApiError) => {
			const errorData = error.data as {
				type: 'email' | 'password' | 'remember' | `root.${string}` | 'root';
				message: string;
			}[];

			errorData?.forEach?.((err) => {
				setError(err.type, {
					type: 'manual',
					message: err.message
				});
			});
		});
	}

	return (
		<form
			name="loginForm"
			noValidate
			className="mt-4 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-4"
						label="Email"
						autoFocus
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="outlined"
						required
						fullWidth
						sx={{
							'& .MuiOutlinedInput-root': {
								backgroundColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(255, 255, 255, 0.9)',
								borderRadius: 2,
								'& input': {
									color: isDark ? '#F9FAFB' : '#111827',
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: isDark ? '#60A5FA' : '#3B82F6',
								},
								'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
									borderColor: isDark ? '#60A5FA' : '#3B82F6',
								},
							},
							'& .MuiInputLabel-root': {
								color: isDark ? '#D1D5DB' : '#6B7280',
								'&.Mui-focused': {
									color: isDark ? '#60A5FA' : '#3B82F6',
								},
							},
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: isDark ? '#6B7280' : '#D1D5DB',
							},
							'& .MuiFormHelperText-root': {
								color: isDark ? '#F87171' : '#DC2626',
							},
						}}
					/>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-4"
						label="Password"
						type="password"
						error={!!errors.password}
						helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
						sx={{
							'& .MuiOutlinedInput-root': {
								backgroundColor: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(255, 255, 255, 0.9)',
								borderRadius: 2,
								'& input': {
									color: isDark ? '#F9FAFB' : '#111827',
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: isDark ? '#60A5FA' : '#3B82F6',
								},
								'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
									borderColor: isDark ? '#60A5FA' : '#3B82F6',
								},
							},
							'& .MuiInputLabel-root': {
								color: isDark ? '#D1D5DB' : '#6B7280',
								'&.Mui-focused': {
									color: isDark ? '#60A5FA' : '#3B82F6',
								},
							},
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: isDark ? '#6B7280' : '#D1D5DB',
							},
							'& .MuiFormHelperText-root': {
								color: isDark ? '#F87171' : '#DC2626',
							},
						}}
					/>
				)}
			/>

			<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between mb-6">
				<Controller
					name="remember"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label="Remember me"
								control={
									<Checkbox
										size="small"
										{...field}
										sx={{
											color: isDark ? '#D1D5DB' : '#6B7280',
											'&.Mui-checked': {
												color: isDark ? '#60A5FA' : '#3B82F6',
											},
											'&:hover': {
												backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
											},
										}}
									/>
								}
								sx={{
									'& .MuiFormControlLabel-label': {
										color: isDark ? '#E5E7EB' : '#374151',
										fontSize: '0.875rem',
									},
								}}
							/>
						</FormControl>
					)}
				/>

				<Link
					className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
					to="/#"
				>
					Forgot password?
				</Link>
			</div>

			<Button
				variant="contained"
				className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
				aria-label="Sign in"
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="large"
				sx={{
					background: isDark 
						? 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)' 
						: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
					color: '#FFFFFF',
					'&:hover': {
						background: isDark 
							? 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)' 
							: 'linear-gradient(90deg, #1D4ED8 0%, #6D28D9 100%)',
						color: '#FFFFFF',
					},
					'&:disabled': {
						background: isDark ? '#374151' : '#9CA3AF',
						color: isDark ? '#9CA3AF' : '#FFFFFF',
					},
				}}
			>
				Sign in
			</Button>
		</form>
	);
}

export default JwtSignInForm;
