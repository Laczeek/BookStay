import { Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';

const RootLayout = () => {
	return (
		<>
			<header>
				<Navigation />
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
};
export default RootLayout;
