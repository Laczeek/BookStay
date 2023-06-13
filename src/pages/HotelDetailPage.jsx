import { Suspense } from 'react';
import { json, useLoaderData, defer, Await, redirect } from 'react-router-dom';

import HotelDetailsSkeleton from '../skeletons/HotelDetailsSkeleton';
import HotelDetails from '../components/HotelDetails';

import { getUserToken } from '../helpers/AuthUser';

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

		const hotel = { id: hotelId, ...data };

		return hotel;
	} catch (error) {
		throw json({ message: 'Hotel data download failed...' }, { status: 500 });
	}
};

export const loader = ({ params }) => {
	return defer({
		hotelDetails: fetchHotelDetails(params.id),
	});
};

export const action = async ({ request }) => {
	const formData = await request.formData();

	const formId = formData.get('formId');
	const data = formData.get('serialized');

	const token = getUserToken();

	try {
		if (formId === 'deleteHotel') {
			const res = await fetch(
				`https://bookstay-48264-default-rtdb.firebaseio.com/hotels/${JSON.parse(data)}.json?auth=${token.accessToken}`,
				{
					method: request.method,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!res.ok) {
				throw json({ message: "Can't delete this hotel!!!" }, { status: 500 });
			}
			return redirect('/my-hotels');
		} else if (formId === 'reservation') {
			const res = await fetch(
				`https://bookstay-48264-default-rtdb.firebaseio.com/reservations.json?auth=${token.accessToken}`,
				{
					method: request.method,
					headers: {
						'Content-Type': 'application/json',
					},
					body: data,
				}
			);

			if (!res.ok) {
				throw json({ message: "Can't make reservation!!!" }, { status: 500 });
			}
			return redirect('/my-profile');
		}
	} catch (error) {
		console.log(error);
		throw json({ message: "Can't perform the action!!!" }, { status: 500 });
	}
};
