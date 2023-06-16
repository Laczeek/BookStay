import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
	return <CircularProgress size={80} sx={{ display: 'block', margin: '0 auto', marginTop: '2em' }} />;
};

export default LoadingSpinner;
