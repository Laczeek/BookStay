import Modal from '@mui/material/Modal';
import  Card  from '@mui/material/Card';

const ModalForm = props => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: props.modalWidth,
		padding: '2em',
		overflowY: 'auto',
		maxHeight: '80%',
	};

	return (
		<Modal open={props.open} onClose={props.onClose}>
			<Card sx={style} color='inherit'>
				{props.children}
			</Card>
		</Modal>
	);
};

export default ModalForm;
