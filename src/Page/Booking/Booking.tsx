import { Stack } from '@mui/material';
import Box from '@mui/material/Box';

import BookingCalendar from '../../Components/BookingCalendar/BookingCalendar';

function Booking() {
	return (
		<Stack spacing={1} direction="row" sx={{ width: '100%' }}>
			<Box sx={{ flex: '1 1 auto' }}>
				<BookingCalendar />
			</Box>
		</Stack>
	);
}

export default Booking;
