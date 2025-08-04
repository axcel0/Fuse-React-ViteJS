import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Person from '@mui/icons-material/Person';
import Email from '@mui/icons-material/Email';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import _ from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FetchApiError } from '@/utils/apiFetch';
import useJwtAuth from '../useJwtAuth';
import { JwtSignUpPayload } from '../JwtAuthProvider';

/**
 * Form Validation Schema
 */
const schema = z
	.object({
		displayName: z.string().min(1, 'You must enter your name'),
		email: z.string().email('You must enter a valid email').min(1, 'You must enter an email'),
		password: z
			.string()
			.min(1, 'Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: z.string().min(1, 'Password confirmation is required'),
		acceptTermsConditions: z.boolean().refine((val) => val === true, 'The terms and conditions must be accepted.')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});

type FormType = JwtSignUpPayload & {
	passwordConfirm: string;
	acceptTermsConditions: boolean;
};

const defaultValues = {
	displayName: '',
	email: '',
	password: '',
	passwordConfirm: '',
	acceptTermsConditions: false
};

function JwtSignUpForm() {
	const { signUp } = useJwtAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { control, formState, handleSubmit, setError, watch } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	const password = watch('password');

	// Password strength calculation
	const getPasswordStrength = (pwd: string) => {
		let score = 0;
		if (pwd.length >= 8) score += 25;
		if (/[a-z]/.test(pwd)) score += 25;
		if (/[A-Z]/.test(pwd)) score += 25;
		if (/[0-9]/.test(pwd)) score += 25;
		return score;
	};

	const passwordStrength = getPasswordStrength(password || '');
	const getPasswordStrengthColor = () => {
		if (passwordStrength < 50) return 'error';
		if (passwordStrength < 75) return 'warning';
		return 'success';
	};

	function onSubmit(formData: FormType) {
		setIsSubmitting(true);
		const { displayName, email, password } = formData;
		signUp({
			displayName,
			password,
			email
		})
			.then(() => {
				// No need to do anything, registered user data will be set at app/auth/AuthRouteProvider
			})
			.catch((error: FetchApiError) => {
				const errorData = error.data as {
					type: 'email' | 'password' | `root.${string}` | 'root';
					message: string;
				}[];

				errorData?.forEach?.(({ message, type }) => {
					setError(type, { type: 'manual', message });
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	}

	return (
		<div className="space-y-6">
			{isSubmitting && (
				<LinearProgress 
					className="rounded-full"
					sx={{ height: 3 }}
				/>
			)}
			
			<form
				name="registerForm"
				noValidate
				className="space-y-5"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="displayName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Full Name"
							autoFocus
							type="text"
							error={!!errors.displayName}
							helperText={errors?.displayName?.message}
							variant="outlined"
							required
							fullWidth
							disabled={isSubmitting}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Person color="action" />
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: 2,
									transition: 'all 0.2s',
									'&:hover': {
										'& .MuiOutlinedInput-notchedOutline': {
											borderWidth: 2,
										}
									},
									'&.Mui-focused': {
										'& .MuiOutlinedInput-notchedOutline': {
											borderWidth: 2,
										}
									}
								}
							}}
						/>
					)}
				/>

				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Email Address"
							type="email"
							error={!!errors.email}
							helperText={errors?.email?.message}
							variant="outlined"
							required
							fullWidth
							disabled={isSubmitting}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Email color="action" />
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: 2,
									transition: 'all 0.2s',
									'&:hover': {
										'& .MuiOutlinedInput-notchedOutline': {
											borderWidth: 2,
										}
									},
									'&.Mui-focused': {
										'& .MuiOutlinedInput-notchedOutline': {
											borderWidth: 2,
										}
									}
								}
							}}
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<div className="space-y-2">
							<TextField
								{...field}
								label="Password"
								type={showPassword ? 'text' : 'password'}
								error={!!errors.password}
								helperText={errors?.password?.message}
								variant="outlined"
								required
								fullWidth
								disabled={isSubmitting}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setShowPassword(!showPassword)}
												edge="end"
												disabled={isSubmitting}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 2,
										transition: 'all 0.2s',
										'&:hover': {
											'& .MuiOutlinedInput-notchedOutline': {
												borderWidth: 2,
											}
										},
										'&.Mui-focused': {
											'& .MuiOutlinedInput-notchedOutline': {
												borderWidth: 2,
											}
										}
									}
								}}
							/>
							{field.value && (
								<div className="space-y-1">
									<div className="flex items-center justify-between text-sm">
										<span className="text-gray-600 dark:text-gray-400">Password Strength</span>
										<span className={`font-medium ${
											passwordStrength < 50 ? 'text-red-500' : 
											passwordStrength < 75 ? 'text-yellow-500' : 
											'text-green-500'
										}`}>
											{passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
										</span>
									</div>
									<LinearProgress
										variant="determinate"
										value={passwordStrength}
										color={getPasswordStrengthColor() as any}
										sx={{ 
											height: 4, 
											borderRadius: 2,
											backgroundColor: 'rgba(0,0,0,0.1)'
										}}
									/>
								</div>
							)}
						</div>
					)}
				/>

				<Controller
					name="passwordConfirm"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Confirm Password"
							type={showPasswordConfirm ? 'text' : 'password'}
							error={!!errors.passwordConfirm}
							helperText={errors?.passwordConfirm?.message}
							variant="outlined"
							required
							fullWidth
							disabled={isSubmitting}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password confirmation visibility"
											onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
											edge="end"
											disabled={isSubmitting}
										>
											{showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: 2,
									transition: 'all 0.2s',
									'&:hover': {
										'& .MuiOutlinedInput-notchedOutline': {
											borderWidth: 2,
										}
									},
									'&.Mui-focused': {
										'& .MuiOutlinedInput-notchedOutline': {
											borderWidth: 2,
										}
									}
								}
							}}
						/>
					)}
				/>

				<Controller
					name="acceptTermsConditions"
					control={control}
					render={({ field }) => (
						<FormControl error={!!errors.acceptTermsConditions}>
							<FormControlLabel
								label={
									<span className="text-sm text-gray-600 dark:text-gray-400">
										I agree to the{' '}
										<a 
											href="/terms" 
											className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
											target="_blank" 
											rel="noopener noreferrer"
										>
											Terms of Service
										</a>{' '}
										and{' '}
										<a 
											href="/privacy" 
											className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
											target="_blank" 
											rel="noopener noreferrer"
										>
											Privacy Policy
										</a>
									</span>
								}
								control={
									<Checkbox
										{...field}
										size="small"
										disabled={isSubmitting}
										sx={{
											'&.Mui-checked': {
												color: 'primary.main',
											}
										}}
									/>
								}
								sx={{ alignItems: 'flex-start', mt: 1 }}
							/>
							{errors.acceptTermsConditions && (
								<FormHelperText sx={{ ml: 0 }}>
									{errors.acceptTermsConditions.message}
								</FormHelperText>
							)}
						</FormControl>
					)}
				/>

				<Button
					variant="contained"
					className="w-full"
					aria-label="Create Account"
					disabled={_.isEmpty(dirtyFields) || !isValid || isSubmitting}
					type="submit"
					size="large"
					sx={{
						borderRadius: 2,
						py: 1.5,
						fontSize: '1rem',
						fontWeight: 600,
						textTransform: 'none',
						background: (theme) => theme.palette.mode === 'dark' 
							? 'linear-gradient(135deg, rgb(59 130 246) 0%, rgb(37 99 235) 100%)'
							: 'linear-gradient(135deg, rgb(37 99 235) 0%, rgb(29 78 216) 100%)',
						'&:hover': {
							background: (theme) => theme.palette.mode === 'dark'
								? 'linear-gradient(135deg, rgb(29 78 216) 0%, rgb(30 64 175) 100%)'
								: 'linear-gradient(135deg, rgb(29 78 216) 0%, rgb(30 64 175) 100%)',
						},
						'&:disabled': {
							background: 'rgba(0,0,0,0.12)',
							color: 'rgba(0,0,0,0.26)'
						}
					}}
				>
					{isSubmitting ? 'Creating Account...' : 'Create Your Free Account'}
				</Button>
			</form>
		</div>
	);
}

export default JwtSignUpForm;
