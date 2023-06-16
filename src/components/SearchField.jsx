import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

const SearchField = () => {
	const inputRef = useRef();
	const navigate = useNavigate();

	const onSubmit = event => {
		event.preventDefault();
		navigate(`/search/${inputRef.current.value}`);
	};

	return (
		<Box sx={{ maxWidth: '600px', margin: '2em auto' }}>
			<form onSubmit={onSubmit}>
				<Box display={'flex'} columnGap={1}>
					<TextField type='text' size='small' sx={{ flexGrow: '1' }} inputRef={inputRef} />
					<LoadingButton color='inherit' type='submit' loadingIndicator={'Searching…'} variant='contained'>
						<span>Search</span>
					</LoadingButton>
				</Box>
			</form>
		</Box>
	);
};

export default SearchField;
