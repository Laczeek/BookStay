import { json, useLoaderData } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Hotel from '../components/Hotel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { getUserToken } from '../helpers/AuthUser';

const MyHotelsPage = () => {
	const myHotels = useLoaderData();
	console.log(myHotels);
	return (
		<Box textAlign='center'>
			<Typography variant='h4' mb={3} fontWeight='500'>
				My hotels
			</Typography>
			{myHotels && myHotels.length === 0 && <Typography variant='h5'>You haven't added any hotel yet.</Typography>}
			{myHotels && myHotels.length > 0 && (
				<Grid container spacing={3}>
					{myHotels.map(hotel => (
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
			<Button variant='outlined' color='inherit' type='submit' sx={{ marginTop: '2em' }}>
				Add hotel
			</Button>
		</Box>
	);
};

export default MyHotelsPage;

export const loader = async () => {
	const token = getUserToken();

	try {
		const res = await fetch(
			`https://bookstay-48264-default-rtdb.firebaseio.com/hotels.json?orderBy="userId"&equalTo="${token.userId}"`
		);

		if (!res.ok) {
			throw json({ message: "Can't download your hotels!!!" }, { status: 500 });
		}

		const data = await res.json();

		let myHotels = [];

		for (const key in data) {
			const hotel = { id: key, ...data[key] };
			myHotels.push(hotel);
		}

		return myHotels;
	} catch (error) {
		throw json({ message: "Can't download your hotels!!!" }, { status: 500 });
	}
};
