import { useNavigation, useSubmit, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

const AuthForm = ({ mode }) => {
	const data = useActionData();
	const submit = useSubmit();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const onSubmit = data => {
		data.formId = 'withEmail';
		submit({ serialized: JSON.stringify(data) }, { method: 'POST' });
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<Box maxWidth='600px' margin='0 auto'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl sx={{ width: '100%', mb: 2 }}>
					<FormLabel htmlFor='email'>Email:</FormLabel>
					<TextField
						type='email'
						id='email'
						size='small'
						{...register('email', { required: true })}
						error={Boolean(errors.email)}
					/>
				</FormControl>
				<FormControl sx={{ width: '100%' }}>
					<FormLabel htmlFor='password'>Password:</FormLabel>
					<TextField
						type='password'
						id='password'
						size='small'
						{...register('password', { required: true })}
						error={Boolean(errors.password)}
					/>
				</FormControl>
				<Box display='flex'>
					{data && data.errorCode && (
						<Typography color='tomato' mt={3}>
							{data.errorCode.replace('auth/', '').replaceAll('-', ' ').toUpperCase()}
						</Typography>
					)}
					<LoadingButton
						sx={{ mt: 2, ml: 'auto' }}
						color='inherit'
						type='submit'
						loading={isSubmitting}
						loadingIndicator={'Loading…'}
						variant='contained'>
						<span>{mode}</span>
					</LoadingButton>
				</Box>
			</form>
		</Box>
	);
};

export default AuthForm;
