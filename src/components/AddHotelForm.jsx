import { useState } from 'react';
import { useSubmit, useNavigation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import RoomForm from './RoomForm';
import ModalForm from '../ui/Modal';

const AddHotelForm = () => {
	const [rooms, setRooms] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	const submit = useSubmit();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const toggleModal = () => {
		setShowModal(prevState => !prevState);
	};

	const addRoom = roomObject => {
		setRooms(prevState => [...prevState, roomObject]);
	};

	const onSubmit = data => {
		const amenitiesArray = Object.keys(data.amenities).filter(key => data.amenities[key]);
		const areaArray = Object.keys(data.area).filter(key => data.area[key]);

		data.amenities = amenitiesArray;
		data.area = areaArray;
		data.rooms = rooms;
		data.ratings = (Math.random() * 10).toFixed(2);

		submit({ serialized: JSON.stringify(data) }, { method: 'POST' });
	};

	return (
		<>
			<ModalForm open={showModal} onClose={toggleModal} modalWidth='300px'>
				<RoomForm addRoom={addRoom} onClose={toggleModal} />
			</ModalForm>

			<Typography variant='h4' textAlign={'center'} gutterBottom>
				Add hotel
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} mb={2}>
						<FormControl sx={{ width: '100%' }}>
							<FormLabel htmlFor='name'>Hotel name:</FormLabel>
							<TextField
								type='text'
								size='small'
								id='name'
								{...register('name', { required: true })}
								error={Boolean(errors.name)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} mb={2}>
						<FormControl sx={{ width: '100%' }}>
							<FormLabel htmlFor='country'>Country:</FormLabel>
							<TextField
								type='text'
								size='small'
								id='country'
								{...register('country', { required: true })}
								error={Boolean(errors.country)}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} mb={2}>
						<FormControl sx={{ width: '100%' }}>
							<FormLabel htmlFor='city'>City:</FormLabel>
							<TextField
								type='text'
								size='small'
								id='city'
								{...register('city', { required: true })}
								error={Boolean(errors.city)}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} mb={2}>
						<FormControl sx={{ width: '100%' }}>
							<FormLabel htmlFor='price'>Default price in $:</FormLabel>
							<TextField
								type='number'
								size='small'
								id='price'
								{...register('price', { required: true })}
								error={Boolean(errors.price)}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} mb={2}>
						<FormControl sx={{ width: '100%' }}>
							<FormLabel htmlFor='description'>Description:</FormLabel>
							<TextField
								id='description'
								multiline
								rows={4}
								maxRows={6}
								{...register('description', { required: true })}
							/>
							{errors.description && (
								<span style={{ color: 'tomato', marginTop: '0.5em' }}>You must add at least short description!!!</span>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} mb={2}>
						<FormControl sx={{ width: '100%' }}>
							<FormLabel htmlFor='hotelImage'>Hotel image (URL):</FormLabel>
							<TextField
								type='text'
								size='small'
								id='hotelImage'
								{...register('image', { required: true })}
								error={Boolean(errors.image)}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} mb={2}>
						<Typography variant='h6'>Amenities:</Typography>
						<FormGroup>
							{[
								{ name: 'pool', ref: register('amenities.pool') },
								{ name: 'parking', ref: register('amenities.parking') },
								{ name: 'restaurant', ref: register('amenities.restaurant') },
								{ name: 'pet friendly', ref: register('amenities.[pet friendly]') },
								{ name: 'free WiFi', ref: register('amenities.[free wifi]') },
								{ name: 'air conditioner', ref: register('amenities.[air conditioner]') },
							].map(amenity => (
								<FormLabel key={amenity.name}>
									<Checkbox type='checkbox' size='small' {...amenity.ref} />
									{amenity.name}
								</FormLabel>
							))}
						</FormGroup>
					</Grid>

					<Grid item xs={12} sm={6} mb={2}>
						<Typography variant='h6'>Area:</Typography>
						<FormGroup>
							{[
								{ name: 'shopping', ref: register('area.shopping') },
								{ name: 'swimming', ref: register('area.swimming') },
								{ name: 'walking', ref: register('area.walking') },
								{ name: 'hiking', ref: register('area.hiking') },
								{ name: 'camping', ref: register('area.camping') },
							].map(activity => (
								<FormLabel key={activity.name}>
									<Checkbox size='small' {...activity.ref} />
									{activity.name}
								</FormLabel>
							))}
						</FormGroup>
					</Grid>
				</Grid>
				<FormGroup>
					<FormLabel>
						<Checkbox size='small' defaultChecked {...register('availability')} />
						Is hotel available?
					</FormLabel>
				</FormGroup>

				<Box my={2}>
					<Box>
						<Typography variant='h6'>Your rooms:</Typography>
						{rooms &&
							rooms.length > 0 &&
							rooms.map((room, index) => (
								<Typography key={index} gutterBottom>
									{index + 1}. {room.name}
								</Typography>
							))}
					</Box>
					<Button variant='outlined' color='inherit' onClick={toggleModal}>
						Add room
					</Button>
				</Box>

				{rooms && rooms.length > 0 && (
					<LoadingButton
						color='inherit'
						type='submit'
						loading={isSubmitting}
						loadingIndicator='Submitting…'
						variant='contained'>
						<span>Add hotel</span>
					</LoadingButton>
				)}
			</form>
		</>
	);
};

export default AddHotelForm;
