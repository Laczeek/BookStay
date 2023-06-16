import { json, redirect } from 'react-router-dom';

import AddHotelForm from '../components/AddHotelForm';

import { getUserToken } from '../helpers/AuthUser';

const NewHotelPage = () => {
	return <AddHotelForm />;
};

export default NewHotelPage;

export const action = async ({ request }) => {
	const token = getUserToken();
	const formData = await request.formData();
	const hotel = JSON.parse(formData.get('serialized'));
	hotel.userId = token.userId;

	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_DATABASE_URL}/hotels.json?auth=${token.accessToken}`,
			{
				method: request.method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(hotel),
			}
		);
		if (!res.ok) {
			throw json({ message: 'Failed to add hotel...' }, { status: 500 });
		}

		return redirect('/');
	} catch (error) {
		console.log(error);
		throw json({ message: 'Failed to add hotel...' }, { status: 500 });
	}
};
