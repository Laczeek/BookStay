import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import Navigation from '../components/Navigation';

const RootLayout = () => {
	return (
		<>
			<Navigation />

			<main>
				<Container sx={{ mb: 15 }}>
					<Outlet />
				</Container>
			</main>
		</>
	);
};
export default RootLayout;
