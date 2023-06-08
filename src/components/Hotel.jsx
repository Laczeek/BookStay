import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Hotel = props => {
	return (
		<Link to={`hotel/${props.id}`} style={{ textDecoration: 'none' }}>
			<Card color='inherit' sx={{ transition: 'background-color 0.3s' }}>
				<CardMedia component='img' alt='Hotel photo' height={244} image={props.image} />

				<CardContent>
					<Typography variant='h6' component='div' gutterBottom>
						{props.name}
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
						<Typography>
							Contry: <span style={{ fontWeight: 700 }}>{props.country}</span>
						</Typography>
						<Typography>
							City: <span style={{ fontWeight: 700 }}>{props.city}</span>
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Box sx={{ py: 1, px: 2, borderRadius: 1 }} bgcolor='ActiveBorder' color='InfoBackground'>
							<Typography>{props.ratings}</Typography>
						</Box>
						<Typography variant='h5'>
							<span style={{ fontWeight: 700 }}>${props.price}</span>
						</Typography>
					</Box>
					{!props.availability && (
						<Typography
							variant='h6'
							mt={1}
							textAlign='center'
							color='tomato
							'>
							Not available
						</Typography>
					)}
				</CardContent>
			</Card>
		</Link>
	);
};

export default Hotel;
