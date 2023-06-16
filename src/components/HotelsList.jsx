import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Hotel from './Hotel';
import { Typography } from '@mui/material';

const HotelsList = ({ hotels, page }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 9;

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	const noHotelsText = page === 'home' ? 'No hotels added yet...' : 'No results found for given phrase...';

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const hotelsToShow = hotels.slice(startIndex, endIndex);

	return (
		<>
			<Grid container spacing={3}>
				{hotelsToShow.length > 0 &&
					hotelsToShow.map(hotel => (
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
			{hotelsToShow.length === 0 && (
				<Typography variant='h5' textAlign={'center'} mt={5}>
					{noHotelsText}
				</Typography>
			)}
			<Stack
				spacing={2}
				sx={{
					position: 'absolute',
					bottom: '15px',
					left: '50%',
					transform: 'translateX(-50%)',
					maxWidth: '1200px',
				}}>
				<Pagination
					count={Math.ceil(hotels.length / itemsPerPage)}
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
