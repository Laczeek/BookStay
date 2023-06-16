import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const SearchHotelsSkeleton = () => {
	return (
		<Grid container spacing={2} >
			{[...Array(10)]?.map((item, index) => (
				<Grid key={index} item xs={12} sm={6} lg={4}>
					<Skeleton animation='wave' variant='rectangular' width={'100%'} height={373.33} />
				</Grid>
			))}
		</Grid>
	);
};

export default SearchHotelsSkeleton;
