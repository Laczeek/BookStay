import { redirect } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase/firebase';

export const action = async () => {
	localStorage.removeItem('token');
	await signOut(auth);
	return redirect('/authentication?mode=login');
};
