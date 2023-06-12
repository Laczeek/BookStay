import { useRouteLoaderData } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-material-ui-carousel';
import Button from '@mui/material/Button';

const RoomCard = ({ room, onOpen }) => {
	const token = useRouteLoaderData('root');

	return (
		<Card sx={{ maxWidth: '100%', mb: 2 }}>
			<Carousel>
				{room.images.map((image, index) => (
					<CardMedia key={index} image={image} sx={{ height: '250px' }} />
				))}
			</Carousel>
			<CardContent>
				<Typography gutterBottom fontWeight={'bold'}>
					{room.name}
				</Typography>
				<Box my={2}>
					{room.amenities.map(amenity => (
						<Typography variant='body2' key={amenity}>
							{' '}
							✔︎ {amenity}
						</Typography>
					))}
				</Box>
				<Typography>
					<span style={{ fontWeight: 'bold', fontSize: '1.6rem' }}>${room.price}</span> <br />
					<span style={{ fontSize: '0.8rem' }}>per night</span>
				</Typography>

				{token && (
					<Button
						variant='contained'
						color='inherit'
						sx={{
							mt: 2,
						}}
						onClick={onOpen}>
						Reserve
					</Button>
				)}

				{!token && <Typography mt={2} color='tomato'>You must sign up to make reservation...</Typography>}
			</CardContent>
		</Card>
	);
};

export default RoomCard;
