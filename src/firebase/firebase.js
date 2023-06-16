import { json } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_API_KEY,
	authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
	projectId: import.meta.env.VITE_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const getHotelsInLoader = async () => {
	const res = await fetch(`${import.meta.env.VITE_APP_DATABASE_URL}/hotels.json`);

	if (!res.ok) {
		throw json({ message: 'Hotels download failed...' }, { status: 500 });
	}

	const data = await res.json();

	let hotels = [];

	for (const [key, value] of Object.entries(data)) {
		const hotel = { id: key, ...value };
		hotels.push(hotel);
	}

	return hotels;
};
