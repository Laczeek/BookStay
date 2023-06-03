import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';

const Hotel = props => {
	let cardStyles = {
		maxWidth: '100%',
		bgcolor: 'var(--card-color)',
	};

	if (!props.availability) {
		cardStyles = {
			maxWidth: '100%',
			bgcolor: '#EDEDED',
		};
	}

	return (
		<Link to={`hotel/${props.id}`} style={{ textDecoration: 'none' }}>
			<Card sx={cardStyles}>
				<CardActionArea>
					<CardMedia component='img' alt='Hotel photo' height={244} image={props.image} />

					<CardContent>
						<Typography variant='h6' component='div' gutterBottom>
							{props.name}
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
							<Typography>
								Contry: <span style={{ fontWeight: 500 }}>{props.country}</span>
							</Typography>
							<Typography>
								City: <span style={{ fontWeight: 500 }}>{props.city}</span>
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<Box sx={{ bgcolor: 'var(--element-primary)', py: 1, px: 2, borderRadius: 1 }}>
								<Typography sx={{ color: 'var(--card-element-font)' }}>{props.ratings}</Typography>
							</Box>
							<Typography variant='h5'>
								<span style={{ fontWeight: 500 }}>${props.price}</span>
							</Typography>
						</Box>
						{!props.availability && <Typography variant='h5' mt={1} textAlign='center' sx={{color:'#FF8787'}}>
								Not available
							</Typography>}
					</CardContent>
				</CardActionArea>
			</Card>
		</Link>
	);
};

export default Hotel;
