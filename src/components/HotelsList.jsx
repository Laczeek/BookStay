import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Hotel from './Hotel';

const DUMMY_HOTELS = [
	{
		id: 'h1',
		name: 'Walkowy Dwór',
		country: 'Poland',
		city: 'Opole',
		availability: true,
		price: '190',
		ratings: '9,4',
		description:
			'Obiekt Pokoje i Apartamenty Jawor położony jest w centrum Zakopanego, zaledwie 50 metrów od popularnych Krupówek. Oferuje on jasne pokoje i apartamenty z bezpłatnym Wi-Fi oraz łazienką.',
		image: 'https://www.hotel-cyprus.pl/thumb?w=1200&h=630&file=hotel-cyprus%2Fuser%2Fhotel%2Fnowe.jpg',
	},
	{
		id: 'h2',
		name: 'Beach Club',
		country: 'Thailand',
		city: 'Ko Tao',
		availability: true,
		price: '120',
		ratings: '7,4',
		description:
			"With a stay at Beach Club by Haad Tien in Koh Tao (Ao Thian Og), you'll be steps from Shark Bay and 5 minutes by foot from Chalok Baan Kao Bay. Featured amenities include complimentary wired Internet access, complimentary newspapers in the lobby, and dry cleaning/laundry services. A ferry terminal shuttle is provided at no charge, and motorcycle parking is available onsite.",
		image: 'https://cf.bstatic.com/images/hotel/max1280x900/987/98785232.jpg',
	},
	{
		id: 'h3',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h4',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h5',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h6',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h7',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h8',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h9',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h10',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
	{
		id: 'h11',
		name: 'Hotel Kazerne',
		country: 'Netherlands',
		city: 'Eindhoven',
		availability: false,
		price: '220',
		ratings: '8,2',
		description:
			"With a stay at Hotel Kazerne in Eindhoven (Eindhoven City Center), you'll be within a 10-minute walk of Philips Museum and Van Abbemuseum. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and luggage storage. Planning an event in Eindhoven? This hotel has facilities measuring 7535 square feet (700 square meters), including conference space.",
		image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e3/5b/3b/guest-room.jpg?w=700&h=-1&s=1',
	},
];

const HotelsList = () => {
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 9;


	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const hotelsToShow = DUMMY_HOTELS.slice(startIndex, endIndex);

	return (
		<>
			<Grid container spacing={2}>
				{hotelsToShow.map(hotel => (
					<Grid item xs={12} sm={6} lg={4} key={hotel.id}>
						<Hotel
							id={hotel.id}
							name={hotel.name}
							city={hotel.city}
							country={hotel.country}
							price={hotel.price}
							ratings={hotel.ratings}
							image={hotel.image}
							availability = {hotel.availability}
						/>
					</Grid>
				))}
			</Grid>
			<Stack
				spacing={2}
				sx={{
					position: 'absolute',
					bottom: '15px',
					left: '50%',
					transform: 'translateX(-50%)',
                    maxWidth: '1200px'
				}}>
				<Pagination
					count={Math.ceil(DUMMY_HOTELS.length / itemsPerPage)}
					page={currentPage}
					onChange={handlePageChange}
					size='large'
					siblingCount={0}
					boundaryCount={1}
				/>
			</Stack>
		</>
	);
};

export default HotelsList;
