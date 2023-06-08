import { json, redirect } from 'react-router-dom';
import AddHotelForm from '../components/AddHotelForm';

const NewHotelPage = () => {
	return <AddHotelForm />;
};

export default NewHotelPage;

export const action = async ({ request }) => {
	const formData = await request.formData();
	const hotel = formData.get('serialized');

	try {
		const res = await fetch('https://bookstay-48264-default-rtdb.firebaseio.com/hotels.json', {
			method: request.method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: hotel,
		});
		if (!res.ok) {
			throw json({ message: 'Failed to add hotel...' }, { status: 500 });
		}

		return redirect('/');
	} catch (error) {
		throw json({ message: 'Failed to add hotel...' }, { status: 500 });
	}

};
