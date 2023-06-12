import { useRouteError } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navigation from '../components/Navigation';

const ErrorPage = () => {
	const error = useRouteError();

    let title = 'An error occured'
	let message = 'Something went wrong...';

    if (error && error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
      }
	if (error && error.status === 500 && error.data && error.data.message) {
		message = error.data.message
	}

	return (
		<>
			<Navigation />
			<Box sx={{ textAlign: 'center' }}>
				<Typography variant='h4' mb={1}>{title}</Typography>
				<Typography variant='h5' sx={{ color: 'var(--font-color)' }}>
					{message}
				</Typography>
			</Box>
		</>
	);
};

export default ErrorPage;
