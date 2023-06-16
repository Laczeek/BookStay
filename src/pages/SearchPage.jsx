import { Suspense } from 'react';
import { useLoaderData, Link, defer, Await, json, useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SearchHotelsSkeleton from '../skeletons/SearchHotelsSkeleton';
import { getHotelsInLoader } from '../firebase/firebase';
import HotelsList from '../components/HotelsList';

const SearchPage = () => {
	const { filteredHotels } = useLoaderData();
	const { id } = useParams();
	return (
		<>
			<Button variant='outlined' color='inherit' component={Link} to='/' sx={{ marginBottom: '2em' }}>
				Go back
			</Button>
			<Typography variant='h4' fontWeight={'500'} textAlign={'center'} mb={2}>
				Search results for "{id}":
			</Typography>
			<Suspense fallback={<SearchHotelsSkeleton />}>
				<Await resolve={filteredHotels}>
					{resolvedFilteredHotels => <HotelsList hotels={resolvedFilteredHotels} page = {'search'}/>}
				</Await>
			</Suspense>
		</>
	);
};

export default SearchPage;

const fetchHotels = async searchId => {
	try {
		const hotels = await getHotelsInLoader();

		const filteredHotels = hotels.filter(hotel => {
			if (
				hotel.name.toLowerCase().includes(searchId.toLowerCase()) ||
				hotel.country.toLowerCase().includes(searchId.toLowerCase()) ||
				hotel.city.toLowerCase().includes(searchId.toLowerCase())
			) {
				return true;
			} else {
				return false;
			}
		});

		return filteredHotels;
	} catch (error) {
		throw json({ message: 'Hotel download failed...' }, { status: 500 });
	}
};

export const loader = ({ params }) => {
	return defer({
		filteredHotels: fetchHotels(params.id),
	});
};
