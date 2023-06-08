import { Suspense } from 'react';
import { json, useLoaderData, defer, Await } from 'react-router-dom';

import HotelDetailsSkeleton from '../skeletons/HotelDetailsSkeleton';
import HotelDetails from '../components/HotelDetails';

const HotelDetailPage = () => {
	const data = useLoaderData();

	return (
		<Suspense fallback={<HotelDetailsSkeleton />}>
			<Await resolve={data.hotelDetails}>{resolvedDetails => <HotelDetails {...resolvedDetails} />}</Await>
		</Suspense>
	);
};

export default HotelDetailPage;

const fetchHotelDetails = async hotelId => {
	try {
		const res = await fetch(`https://bookstay-48264-default-rtdb.firebaseio.com/hotels/${hotelId}.json`);

		if (!res.ok) {
			throw json({ message: 'Hotel data download failed...' }, { status: 500 });
		}
		const data = await res.json();

		return data;
	} catch (error) {
		throw json({ message: 'Hotel data download failed...' }, { status: 500 });
	}
};

export const loader = ({ params }) => {
	return defer({
		hotelDetails: fetchHotelDetails(params.id),
	});
};
