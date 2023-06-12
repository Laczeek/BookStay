import { Link, useRouteLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';

import RoomCard from './RoomCard';

const HotelDetails = props => {
	const token = useRouteLoaderData('root');
	const navigation = useNavigation();
	const submit = useSubmit();
	const isSubmitting = navigation.state === 'submitting';

	const deleteHotelHandler = () => {
		const proceded = window.confirm('Are you sure?');
		if (proceded) {
			submit({ serialized: JSON.stringify(props.id) }, { method: 'DELETE' });
		}
	};

	return (
		<>
			<Button variant='outlined' color='inherit' component={Link} to='/'>
				Go back
			</Button>

			{!props.availability && (
				<Typography variant='h6' mt={1} sx={{ color: 'tomato' }}>
					Not available
				</Typography>
			)}

			<Box my={3}>
				<ImageList sx={{ width: '100%', height: 350 }} cols={2} rowHeight={320}>
					<ImageListItem>
						<img src={props.image} loading='lazy' style={{ height: '100%' }} />
					</ImageListItem>

					{props.rooms &&
						props.rooms.map(room =>
							room.images && room.images[0] ? (
								<ImageListItem key={room.name}>
									<img src={room.images[0]} loading='lazy' style={{ height: '100%' }} />
								</ImageListItem>
							) : null
						)}
				</ImageList>
			</Box>
			<Box>
				<Typography variant='h5' sx={{ fontWeight: 700 }} gutterBottom>
					{props.name}
				</Typography>

				<Box sx={{ display: 'flex', justifyContent: 'space-between' }} my={2}>
					<Typography>
						Contry: <span style={{ fontWeight: 700 }}>{props.country}</span>
					</Typography>
					<Typography>
						City: <span style={{ fontWeight: 700 }}>{props.city}</span>
					</Typography>
				</Box>

				<Box
					bgcolor='ButtonFace'
					color='ButtonText'
					sx={{ py: 1, px: 2, borderRadius: 1, width: 'fit-content' }}
					mb={3}>
					<Typography>{props.ratings}</Typography>
				</Box>

				<Typography>{props.description}</Typography>

				<Box my={4}>
					<Typography variant='h6' gutterBottom>
						Amenities
					</Typography>
					<Grid container spacing={2}>
						{props.amenities &&
							props.amenities.map(amenity => (
								<Grid item xs={6} key={amenity}>
									✔︎ {amenity}
								</Grid>
							))}
					</Grid>
				</Box>
				<Box>
					<Typography variant='h6' gutterBottom>
						What you can do in the area?
					</Typography>
					<Grid container spacing={2}>
						{props.area &&
							props.area.map(amenity => (
								<Grid item xs={6} key={amenity}>
									✔︎ {amenity}
								</Grid>
							))}
					</Grid>
				</Box>

				<Grid container spacing={2} mt={3}>
					{props.rooms.map(room => {
						return (
							<Grid item xs={12} sm={6} md={4} key={room.name}>
								{' '}
								<RoomCard room={room} />
							</Grid>
						);
					})}
				</Grid>
			</Box>
			{token && token.userId === props.userId && (
				<LoadingButton
					sx={{ mt: 2, ml: 'auto', bgcolor: 'tomato' }}
					color='inherit'
					type='submit'
					loading={isSubmitting}
					loadingIndicator={'Removing…'}
					variant='contained'
					onClick={deleteHotelHandler}>
					<span>Remove hotel</span>
				</LoadingButton>
			)}
		</>
	);
};
export default HotelDetails;
