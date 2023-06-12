import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDaM9mJRI70FgifbVFBQ0EYrKSHpbEDBPU',
	authDomain: 'bookstay-48264.firebaseapp.com',
	databaseURL: 'https://bookstay-48264-default-rtdb.firebaseio.com',
	projectId: 'bookstay-48264',
	storageBucket: 'bookstay-48264.appspot.com',
	messagingSenderId: '803943478378',
	appId: '1:803943478378:web:20ea76f9ecde6af8574613',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
