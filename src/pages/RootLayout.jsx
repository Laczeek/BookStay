import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import Container from '@mui/material/Container';

import Navigation from '../components/Navigation';
import { getTokenDuration } from '../helpers/AuthUser';
import { useEffect } from 'react';

const RootLayout = () => {
	const token = useLoaderData();

	const submit = useSubmit();

	useEffect(() => {
		if (!token) {
			return;
		}
		if (token === 'EXPIRED') {
			submit(null, { method: 'POST', action: '/logout' });
			return;
		}
		const tokenDuration = getTokenDuration();
		console.log(tokenDuration);
		const timeout = setTimeout(() => {
			submit(null, { method: 'POST', action: '/logout' });
		}, tokenDuration);

		return () => clearTimeout(timeout);
	}, [token, submit]);

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
