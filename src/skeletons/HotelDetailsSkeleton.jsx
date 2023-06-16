import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';

const HotelDetailsSkeleton = () => {
	const navigate = useNavigate();
	return (
		<>
			<Button
				variant='outlined'
				color='inherit'
				onClick={() => navigate(-1)}>
				Go back
			</Button>

			<Box my={3}>
				<Skeleton animation='wave' variant='rectangular' width={'100%'} height={350} />
			</Box>

			<Box>
				<Skeleton variant='h5'/>
				<Box my={2}>
					<Skeleton variant='text' sx={{ fontSize: '1rem' }} />
				</Box>
			</Box>

			<Skeleton variant='rectangular' width={53.56} height={40} sx={{ mb: 2 }} />
			<Skeleton variant='text' sx={{ fontSize: '1rem' }} />

			<Box my={4}>
				<Grid container spacing={2}>
					{[...Array(6)]?.map((item, index) => (
						<Grid key={index} item xs={6}>
							<Skeleton variant='text' sx={{ fontSize: '1rem' }} />
						</Grid>
					))}
				</Grid>
			</Box>
			<Box>
				<Grid container spacing={2}>
					{[...Array(6)]?.map((item, index) => (
						<Grid key={index} item xs={6}>
							<Skeleton variant='text' sx={{ fontSize: '1rem' }} />
						</Grid>
					))}
				</Grid>
			</Box>
			<Grid container spacing={2} mt={3}>
				{[...Array(3)]?.map((item, index) => (
					<Grid key={index} item xs={12} md={4}>
						<Skeleton variant='rectangular' width={'100%'} height={600} sx={{ mb: 2 }} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default HotelDetailsSkeleton;
