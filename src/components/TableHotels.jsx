import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  Typography  from '@mui/material/Typography';

const rowsTitle = ['Hotel name', 'Hotel address', 'Booker', 'Check in', 'Check out', 'Room name', 'Guests','Profit'];
function createData(name, address, who, checkIn, checkOut, roomName, guests,profit) {
	return { name, address, who, checkIn, checkOut, roomName, guests,profit };
}

const TableHotels = ({ reservations }) => {
	const rows = reservations.map(reservation =>
		createData(
			reservation.hotelName,
			reservation.address,
			reservation.userEmail,
			reservation.checkIn,
			reservation.checkOut,
			reservation.roomName,
			reservation.guests,
			reservation.price
		)
	);

	return (
		<TableContainer component={Paper} sx={{ marginTop: '2em' }}>
			<Typography py={2} variant='h4' fontWeight={500}>
				Reservations for my hotels
			</Typography>
			<Table sx={{ minWidth: 300 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						{rowsTitle.map((row, index) =>
							index === 0 ? (
								<TableCell key={index}>{row}</TableCell>
							) : (
								<TableCell align='right' key={index}>
									{row}
								</TableCell>
							)
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.name}
							</TableCell>
							<TableCell align='right'>{row.address}</TableCell>
							<TableCell align='right'>{row.who}</TableCell>
							<TableCell align='right'>{row.checkIn}</TableCell>
							<TableCell align='right'>{row.checkOut}</TableCell>
							<TableCell align='right'>{row.roomName}</TableCell>
							<TableCell align='right'>{row.guests}</TableCell>
							<TableCell align='right'>${row.profit}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableHotels;
