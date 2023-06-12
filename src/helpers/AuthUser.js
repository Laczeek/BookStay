export const setUserToken = userTokenData => {
	const token = {
		email: userTokenData.email,
		accessToken: userTokenData.accessToken,
		tokenDetails: userTokenData.stsTokenManager,
		userId: userTokenData.uid,
		photoURL : userTokenData.photoURL || null
	};

	localStorage.setItem('token', JSON.stringify(token));

	console.log(token);
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

export const loader = () => {
	const token = getUserToken();
	return token;
};
