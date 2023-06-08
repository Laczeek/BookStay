import { Suspense } from 'react';
import { json, useLoaderData, defer, Await } from 'react-router-dom';

import HotelsListSkeleton from '../skeletons/HotelsListSkeleton';
import HotelsList from '../components/HotelsList';

const HomePage = () => {
	const data = useLoaderData();

	return (
		<Suspense fallback={<HotelsListSkeleton />}>
			<Await resolve={data.hotels}>{resolvedHotels => <HotelsList hotels={resolvedHotels} />}</Await>
		</Suspense>
	);
};

export default HomePage;

const fetchHotels = async () => {
	try {
		await  new Promise((resolve, reject) => {
			setTimeout(() => {
			  resolve("foo");
			}, 2000);
		  });

		const res = await fetch('https://bookstay-48264-default-rtdb.firebaseio.com/hotels.json');

		if (!res.ok) {
			throw json({ message: 'Hotel download failed...' }, { status: 500 });
		}

		const data = await res.json();

		let hotels = [];

		for (const key in data) {
			const hotel = { id: key, ...data[key] };
			hotels.push(hotel);
		}

		return hotels;
	} catch (error) {
		throw json({ message: 'Hotel download failed...' }, { status: 500 });
	}
};

export const loader = () => {
	return defer({
		hotels: fetchHotels(),
	});
};
