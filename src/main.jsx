import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage.jsx';

import ThemeProviderComponent from './context/ThemeProvider.jsx';
import ImageProvider from './context/ImageProvider.jsx';

import RootLayout from './pages/RootLayout.jsx';
import { loader as tokenLoader } from './helpers/AuthUser.js';
import Authentication, { action as authAction } from './pages/Authentication.jsx';
import HomePage, { loader as hotelsLoader } from './pages/HomePage.jsx';
import HotelDetailPage, { loader as hotelDetailLoader, action as deleteOrReserveHotel } from './pages/HotelDetailPage.jsx';
import NewHotelPage, { action as newHotelAction } from './pages/NewHotelPage.jsx';
import MyHotelsPage, { loader as myHotelsLoader } from './pages/MyHotelsPage.jsx';
import MyProfilePage, {loader as reservationsLoader} from './pages/MyProfilePage.jsx';
import { action as logoutAction } from './pages/Logout.js';
import { checkAuthorizationRoute } from './helpers/AuthUser.js';

import './index.css';
const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		id: 'root',
		loader: tokenLoader,
		children: [
			{ index: true, element: <HomePage />, loader: hotelsLoader },
			{ path: 'hotel/:id', element: <HotelDetailPage />, loader: hotelDetailLoader, action: deleteOrReserveHotel },
			{ path: 'new-hotel', element: <NewHotelPage />, action: newHotelAction, loader:checkAuthorizationRoute },
			{ path: 'my-hotels', element: <MyHotelsPage />, loader: myHotelsLoader },
			{ path: 'my-profile', element: <MyProfilePage />, loader:reservationsLoader },
			{ path: 'authentication', element: <Authentication />, action: authAction },
			{ path: 'logout', action: logoutAction },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProviderComponent>
			<ImageProvider>
				<RouterProvider router={router} />
			</ImageProvider>
		</ThemeProviderComponent>
	</React.StrictMode>
);
