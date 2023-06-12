import { json, redirect, useSearchParams } from 'react-router-dom';

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

import Typography from '@mui/material/Typography';

import { auth } from '../firebase/firebase';
import { setUserToken } from '../helpers/AuthUser';

import AuthForm from '../components/AuthForm';
import GoogleButton from '../ui/GoogleButton';

const Authentication = () => {
	const [searchParams] = useSearchParams('mode');
	const mode = searchParams.get('mode');
	const stringMode = mode.toUpperCase().replace('-', ' ');

	return (
		<>
			<Typography textAlign='center' variant='h4' gutterBottom>
				{stringMode}
			</Typography>
			<AuthForm mode={stringMode} />
			<GoogleButton mode={stringMode} />
		</>
	);
};
export default Authentication;

export const action = async ({ request }) => {
	const url = new URL(request.url);
	const mode = new URLSearchParams(url.search).get('mode') || 'login';

	const formData = await request.formData();

	const userData = JSON.parse(formData.get('serialized'));

	if (mode !== 'sign-up' && mode !== 'login') {
		throw json({ message: "Can't send a request!!!" }, { status: 500 });
	}

	try {
		if (userData.formId === 'withEmail') {
			if (mode === 'sign-up') {
				const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
				const user = userCredential.user;
				setUserToken(user);
			} else if (mode === 'login') {
				const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
				const user = userCredential.user;
				setUserToken(user);
			}
		} else if (userData.formId === 'withGoogle') {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			setUserToken(user);
		}
		return redirect('/');
	} catch (error) {
		const errorCode = error.code;

		return {errorCode}
	}
};
