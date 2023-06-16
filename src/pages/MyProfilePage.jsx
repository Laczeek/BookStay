import { useRef, useContext, Suspense } from 'react';
import { json, redirect, useLoaderData, useRouteLoaderData, defer, Await } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { ImageContext } from '../context/ImageProvider';
import LoadingSpinner from '../ui/LoadingSpinner';
import TableProfile from '../components/TableProfile';
import { getUserToken } from '../helpers/AuthUser';

const MyProfilePage = () => {
	const token = useRouteLoaderData('root');
	const { reservations } = useLoaderData();

	const imageContext = useContext(ImageContext);
	const imageRef = useRef();

	const onSubmit = event => {
		event.preventDefault();
		const file = imageRef.current.files[0];
		const reader = new FileReader();
		reader.onload = event => {
			const base64Data = event.target.result;
			localStorage.setItem('imageFile', base64Data);
			imageContext.changeImageFile(base64Data);
		};
		reader.readAsDataURL(file);
	};

	return (
		<>
			<Typography variant='h5'>
				Your email: <span style={{ fontWeight: '500' }}>{token.email}</span>
			</Typography>
			<Box display='flex' alignItems={'center'} gap={1} mt={4} maxWidth={'400px'}>
				<Avatar
					sx={{ width: '60px', height: '60px' }}
					src={imageContext.imageFile ? imageContext.imageFile : token.photoURL}
				/>
				<form onSubmit={onSubmit}>
					<FormControl>
						<FormLabel>Change your avatar.</FormLabel>
						<TextField type='file' size='small' inputRef={imageRef} />
					</FormControl>
					<LoadingButton color='inherit' type='submit' variant='contained' size='small' sx={{ marginTop: '0.5em' }}>
						<span>Change avatar</span>
					</LoadingButton>
				</form>
			</Box>

			
			<Suspense fallback={<LoadingSpinner />}>
				<Await resolve={reservations}>
					{resolvedReservations => (
						<>
							{resolvedReservations && resolvedReservations.length > 0 ? (
								<TableProfile reservations={resolvedReservations} /> 
							) : <Typography mt={6} variant='h5' textAlign={'center'}>You haven't made any reservations yet...</Typography>}
						</>
					)}
				</Await>
			</Suspense>
		</>
	);
};

export default MyProfilePage;

export const fetchReservations = async token => {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_DATABASE_URL}/reservations.json?orderBy="bookerId"&equalTo="${token.userId}"`
		);

		if (!res.ok) {
			throw json({ message: "Can't get your reservations!!!" }, { status: 500 });
		}

		const data = await res.json();

		let reservations = [];

		for (const [key, value] of Object.entries(data)) {
			const reservation = { reservationId: key, ...value };
			reservations.push(reservation);
		}

		return reservations;
	} catch (error) {
		throw json({ message: "Can't get your reservations!!!" }, { status: 500 });
	}
};

export const loader = () => {
	const token = getUserToken();

	if (!token) {
		return redirect('/authentication?mode=login');
	}
	return defer({ reservations: fetchReservations(token) });
};
