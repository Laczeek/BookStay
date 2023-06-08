import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage.jsx';
import ThemeProviderComponent from './context/ThemeProvider.jsx';
import HomePage, { loader as hotelsLoader } from './pages/HomePage.jsx';
import RootLayout from './pages/RootLayout.jsx';
import HotelDetailPage, { loader as hotelDetailLoader } from './pages/HotelDetailPage.jsx';
import NewHotelPage, { action as newHotelAction } from './pages/NewHotelPage.jsx';

import './index.css';
import MyHotelsPage from './pages/MyHotelsPage.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage />, loader: hotelsLoader },
			{ path: '/hotel/:id', element: <HotelDetailPage />, loader: hotelDetailLoader },
			{ path: 'new-hotel', element: <NewHotelPage />, action: newHotelAction },
			{ path: 'my-hotels', element: <MyHotelsPage /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProviderComponent>
			<RouterProvider router={router} />
		</ThemeProviderComponent>
	</React.StrictMode>
);
