import { useSubmit } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';


const GoogleButton = ({ mode }) => {
	const submit = useSubmit();

	const onSubmit = event => {
		event.preventDefault();
		const data = {
			formId: 'withGoogle',
		};

		submit({ serialized: JSON.stringify(data) }, { method: 'POST' });
	};

	return (
		<form style={{ textAlign: 'center', marginTop:'2em' }} onSubmit={onSubmit}>
			<Button variant='outlined' startIcon={<GoogleIcon />} type='submit'>
				{mode} with Google
			</Button>
		</form>
	);
};

export default GoogleButton;
