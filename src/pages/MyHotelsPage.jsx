import { Suspense } from 'react';
import { Link, json, redirect, useLoaderData, defer, Await } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Hotel from '../components/Hotel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import LoadingSpinner from '../ui/LoadingSpinner';
import TableHotels from '../components/TableHotels';
import { getUserToken } from '../helpers/AuthUser';

const MyHotelsPage = () => {
	const {data} = useLoaderData();

	return (
		<Suspense fallback = {<LoadingSpinner/>}>
			<Await resolve={data}>{resolvedData => <Box textAlign='center'>
			<Typography variant='h4' mb={3} fontWeight='500'>
				My hotels
			</Typography>
			{resolvedData.myHotels && resolvedData.myHotels.length === 0 && (
				<Typography variant='h5'>You haven't added any hotel yet.</Typography>
			)}
			{resolvedData.myHotels && resolvedData.myHotels.length > 0 && (
				<Grid container spacing={3}>
					{resolvedData.myHotels.map(hotel => (
						<Grid item xs={12} sm={6} lg={4} key={hotel.id}>
							<Hotel
								id={hotel.id}
								name={hotel.name}
								city={hotel.city}
								country={hotel.country}
								price={hotel.price}
								ratings={hotel.ratings}
								image={hotel.image}
								availability={hotel.availability}
							/>
						</Grid>
					))}
				</Grid>
			)}
			<Button
				variant='outlined'
				color='inherit'
				type='submit'
				sx={{ marginTop: '2em' }}
				component={Link}
				to='/new-hotel'>
				Add hotel
			</Button>

			{resolvedData.reservations && resolvedData.reservations.length > 0 && <TableHotels reservations={resolvedData.reservations} />}
		</Box>}</Await>
		</Suspense>
	);
};

export default MyHotelsPage;

const fetchHotelsAndReservations = async (token) => {
	try {
		const resMyHotels = await fetch(
			`https://bookstay-48264-default-rtdb.firebaseio.com/hotels.json?orderBy="userId"&equalTo="${token.userId}"`
		);

		const dataMyHotels = await resMyHotels.json();

		let myHotels = [];

		for (const [key, value] of Object.entries(dataMyHotels)) {
			const hotel = { id: key, ...value };
			myHotels.push(hotel);
		}

		const resReservations = await fetch(
			`https://bookstay-48264-default-rtdb.firebaseio.com/reservations.json?orderBy="ownerId"&equalTo="${token.userId}"`
		);

		const dataReservations = await resReservations.json();

		let reservations = [];

		for (const [key, value] of Object.entries(dataReservations)) {
			const reservation = {
				reservationId: key,
				...value,
			};
			reservations.push(reservation);
		}

		const data = {
			myHotels,
			reservations,
		};

		return data;
	} catch (error) {
		throw json({ message: "Can't download your hotels and reservations data!!!" }, { status: 500 });
	}
};

export const loader = () => {
	const token = getUserToken();

	if (!token) {
		return redirect('/authentication?mode=login');
	}

	return defer(
		{data: fetchHotelsAndReservations(token)}
	)
}