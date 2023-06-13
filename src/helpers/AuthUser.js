import { redirect } from 'react-router-dom';

export const setUserToken = userTokenData => {
	const token = {
		email: userTokenData.email,
		accessToken: userTokenData.accessToken,
		tokenDetails: userTokenData.stsTokenManager,
		userId: userTokenData.uid,
		photoURL: userTokenData.photoURL || null,
	};

	localStorage.setItem('token', JSON.stringify(token));
};

export const getUserToken = () => {
	const token = JSON.parse(localStorage.getItem('token'));

	if (!token) {
		return null;
	}
	const expirationTime = token.tokenDetails.expirationTime;

	if (expirationTime < 0) {
		return 'EXPIRED';
	}

	return token;
};

export const loader = async () => {
	const token = getUserToken();

	return token;
};

export const checkAuthorizationRoute = () => {
	const token = getUserToken();
	if (!token) {
		return redirect('/authentication?mode=login');
	}
	return null;
};
