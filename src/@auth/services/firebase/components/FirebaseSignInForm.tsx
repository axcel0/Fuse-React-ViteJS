import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useAppDispatch } from 'src/store/hooks'; // Removed: migrated to TanStack Query
// import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice'; // Removed: use useFuseMessage hook
import firebase from 'firebase/compat/app';
import useFirebaseAuth from '../useFirebaseAuth';
import { FirebaseSignInPayload } from '../FirebaseAuthProvider';

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

type FormType = FirebaseSignInPayload;

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function FirebaseSignInForm() {
	const { signIn } = useFirebaseAuth();
	// TODO: Replace with TanStack Query mutation for better error handling
	// const dispatch = useAppDispatch();

	const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		setValue('email', 'hi@withinpixels.com', { shouldDirty: true, shouldValidate: true });
		setValue('password', 'dummyPassword', { shouldDirty: true, shouldValidate: true });
	}, [setValue]);

	function onSubmit(formData: FormType) {
		const { email, password } = formData;

		signIn({
			email,
			password
		}).catch((_error) => {
			const error = _error as firebase.auth.Error;

			const errors: {
				type: 'email' | 'password';
				message: string;
			}[] = [];

			const emailErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			if (emailErrorCodes.includes(error.code)) {
				errors.push({
					type: 'email',
					message: error.message
				});
			}

			if (passwordErrorCodes.includes(error.code)) {
				errors.push({
					type: 'password',
					message: error.message
				});
			}

			if (!emailErrorCodes.includes(error.code)) {
				// TODO: Replace with proper error handling using TanStack Query
				console.error('Firebase Auth Error:', error.message);
			}

			errors.forEach((err) => {
				setError(err.type, {
					type: 'manual',
					message: err.message
				});
			});
		});
	}

	return (
		<div className="w-full">
			<form
				name="loginForm"
				noValidate
				className="mt-8 flex w-full flex-col justify-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-6"
							label="Email"
							autoFocus
							type="email"
							error={!!errors.email}
							helperText={errors?.email?.message}
							variant="outlined"
							required
							fullWidth
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-6"
							label="Password"
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							variant="outlined"
							required
							fullWidth
						/>
					)}
				/>

				<Button
					variant="contained"
					color="secondary"
					className="w-full"
					aria-label="Sign in"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					type="submit"
					size="large"
				>
					Sign in
				</Button>
			</form>
		</div>
	);
}

export default FirebaseSignInForm;
