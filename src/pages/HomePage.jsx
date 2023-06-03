import Container from '@mui/material/Container';

import HotelsList from '../components/HotelsList';

const HomePage = () => {
	return (
		<Container sx={{ mb: 20}}>
			<HotelsList />
		</Container>
	);
};

export default HomePage;
