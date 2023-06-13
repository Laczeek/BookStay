import { useState } from 'react';
import { useSubmit, useNavigation } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const startingDates = [
	{
		startDate: new Date(),
		endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
		key: 'selection',
		days: 3,
	},
];

const ReservationForm = ({ room, hotelInfo, token }) => {
	const submit = useSubmit();
	const navigation = useNavigation();
	const [dates, setDates] = useState(startingDates);
	const [guests, setGuests] = useState(1);
	const [error, setError] = useState(null);

	const isSubmitting = navigation.state === 'submitting';
	const totalPrice = room.price * dates[0].days;

	const handleSelect = ranges => {
		const start = ranges.selection.startDate.getTime();
		const end = ranges.selection.endDate.getTime();

		const timeDiff = Math.abs(end - start);
		const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

		ranges.selection.days = dayDiff;

		if (dayDiff <= 0) {
			setError("You can't book a hotel for 0 nights!");
		} else {
			setError(null);
		}
		setDates([ranges.selection]);
	};

	const onSubmit = event => {
		event.preventDefault();
		if (error) {
			return;
		}

		const reservation = {
			hotelId: hotelInfo.id,
			ownerId: hotelInfo.userId,
			hotelName: hotelInfo.name,
			price: totalPrice,
			roomName: room.name,
			address: `${hotelInfo.country} / ${hotelInfo.city}`,
			checkIn: dates[0].startDate.toLocaleDateString(),
			checkOut: dates[0].endDate.toLocaleDateString(),
			bookerId: token.userId,
			userEmail: token.email,
			guests: guests
		};

		submit({formId: 'reservation' ,serialized: JSON.stringify(reservation)}, { method: 'POST' });
	};

	return (
		<>
			<Typography variant='h6'>{`$${room.price} / night`}</Typography>

			<form onSubmit={onSubmit}>
				<FormControl fullWidth sx={{ marginY: '1em' }}>
					<InputLabel id='numberGuestsLabel'>Number of guests</InputLabel>
					<Select
						labelId='numberGuestsLabel'
						id='numberGuestsSelect'
						value={guests}
						label='Number of guests'
						onChange={event => setGuests(event.target.value)}>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
					</Select>
				</FormControl>
				<DateRange ranges={dates} onChange={handleSelect} moveRangeOnFirstSelection={false} minDate={new Date()} />
				{error && (
					<Typography variant='h6' color={'tomato'} gutterBottom>
						{error}
					</Typography>
				)}
				<Box display={'flex'} justifyContent={'space-between'} mb={2}>
					<Typography fontWeight={'700'}>{`$${room.price} x ${dates[0].days} nights`}</Typography>
					<Typography fontWeight={'700'}>{`$${totalPrice}`}</Typography>
				</Box>
				<Typography variant='h5' fontWeight={'700'}>{`Subtotal: $${totalPrice}`}</Typography>

				<Box mt={1} display={'flex'}>
					<LoadingButton
						disabled={Boolean(error)}
						sx={{ marginLeft: 'auto' }}
						color='inherit'
						type='submit'
						loading = {isSubmitting}
						loadingIndicator='Reserving…'
						variant='contained'>
						<span>Reserve</span>
					</LoadingButton>
				</Box>
			</form>
		</>
	);
};

export default ReservationForm;
