import { Suspense } from 'react';
import { useLoaderData, defer, Await, json } from 'react-router-dom';

import { getHotelsInLoader } from '../firebase/firebase';
import HotelsListSkeleton from '../skeletons/HotelsListSkeleton';
import SearchField from '../components/SearchField';
import HotelsList from '../components/HotelsList';

const HomePage = () => {
	const data = useLoaderData();

	return (
		<>
			<SearchField />
			<Suspense fallback={<HotelsListSkeleton />}>
				<Await resolve={data.hotels}>{resolvedHotels => <HotelsList hotels={resolvedHotels} page={'home'} />}</Await>
			</Suspense>
		</>
	);
};

export default HomePage;

const fetchHotels = () => {
	try {
		const hotels = getHotelsInLoader();
		return hotels;
	} catch (error) {
		throw json({ message: 'Hotels download failed...' }, { status: 500 });
	}
};

export const loader = () => {
	return defer({
		hotels: fetchHotels(),
	});
};
