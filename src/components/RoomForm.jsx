import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Checkbox, FormGroup } from '@mui/material';

const RoomForm = ({ addRoom, onClose }) => {
	const {
		register: registerRoom,
		handleSubmit: handleRoomSubmit,
		formState: { errors: errorsRoom },
	} = useForm();

	const onSubmitRoom = data => {
		let amenitiesArray = Object.keys(data.amenities).filter(key => data.amenities[key]);
		let imagesArray = data.images.filter(image => image !== '');

		data.amenities = amenitiesArray;
		data.images = imagesArray;

		addRoom(data);

		onClose();
	};

	return (
		<form onSubmit={handleRoomSubmit(onSubmitRoom)}>
			<FormControl sx={{ marginBottom: '1em', width: '100%' }}>
				<FormLabel htmlFor='roomName'>Room name:</FormLabel>
				<TextField
					type='text'
					size='small'
					{...registerRoom('name', { required: true })}
					id='roomName'
					error={Boolean(errorsRoom.name)}
				/>
			</FormControl>

			<FormControl sx={{ marginBottom: '1em', width: '100%' }}>
				<FormLabel htmlFor='roomPrice'>Room price:</FormLabel>
				<TextField
					type='number'
					size='small'
					{...registerRoom('price', { required: true })}
					id='roomPrice'
					error={Boolean(errorsRoom.price)}
				/>
			</FormControl>

			<Box mb={1}>
				<p style={{ fontSize: '1.1rem' }}>Room amenities:</p>
				<FormGroup>
					{[
						{ name: 'city view', ref: registerRoom('amenities.[city view]') },
						{ name: '1 king bed', ref: registerRoom('amenities.[1 king bed]') },
						{ name: '2 beds', ref: registerRoom('amenities.[2 beds]') },
						{ name: 'bathroom', ref: registerRoom('amenities.bathroom') },
						{ name: 'tv', ref: registerRoom('amenities.tv') },
					].map(amenity => (
						<FormLabel key={amenity.name}>
							<Checkbox {...amenity.ref} size='small' />
							{amenity.name}
						</FormLabel>
					))}
				</FormGroup>
			</Box>

			<FormGroup sx={{ marginBottom: '1em' }}>
				<FormLabel htmlFor='roomImage'>Room images (URLS):</FormLabel>
				<TextField
					type='text'
					size='small'
					id='roomImage'
					{...registerRoom('images.0', { required: true })}
					error={Boolean(errorsRoom.images)}
				/>
				<TextField type='text' size='small' {...registerRoom('images.1')} />
				<TextField type='text' size='small' {...registerRoom('images.2')} />
				<TextField type='text' size='small' {...registerRoom('images.3')} />
			</FormGroup>
			<Button variant='outlined' color='inherit' type='submit'>
				Add room
			</Button>
		</form>
	);
};

export default RoomForm;
