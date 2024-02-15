import React, { useState } from 'react';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { format } from 'date-fns';

import { BookingEntity } from '../../interface/booking';
import classes from './BookingList.module.scss';

interface Props {
	bookingData: BookingEntity[];
	onSelectBooking: (booking: BookingEntity) => void;
}

function BookingList({ bookingData, onSelectBooking }: Props) {
	const [showRegistered, setShowRegistered] = useState<boolean>(false);

	return (
		<>
			<Stack alignItems="center">
				<FormControlLabel
					className={classes.unselectable}
					control={
						<Checkbox
							value={showRegistered}
							onChange={(e) => setShowRegistered(e.target.checked)}
							sx={{
								color: pink[800],
								'&.Mui-checked': { color: pink[600] },
							}}
						/>
					}
					label="Show Registered"
				/>
			</Stack>
			<List sx={{ width: '100%' }}>
				{bookingData
					.filter((x) => !x.isRegister || showRegistered)
					.map((booking) => {
						return (
							<React.Fragment key={booking.bookId}>
								<ListItemButton
									sx={{ opacity: booking.isRegister ? '0.5' : '1' }}
									onClick={() => onSelectBooking(booking)}
								>
									<ListItemAvatar>
										<Avatar sx={{ bgcolor: booking.patientSex === 'M' ? '#6495ED' : 'pink' }}>
											{booking.patientSex === 'M' ? <MaleIcon /> : <FemaleIcon />}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={booking.patientName}
										secondary={`${booking.modality}, ${format(new Date(booking.startDatetime), 'HH:mm')} - ${format(new Date(booking.endDatetime), 'HH:mm')}`}
									/>
								</ListItemButton>
								<Divider variant="inset" component="li" />
							</React.Fragment>
						);
					})}
			</List>
		</>
	);
}

export default BookingList;
