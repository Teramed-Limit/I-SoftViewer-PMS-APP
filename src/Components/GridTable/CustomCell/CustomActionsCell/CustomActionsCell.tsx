import { useState } from 'react';

import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import { Document, PDFViewer } from '@react-pdf/renderer';
import { ICellRendererParams } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';

import LabelDoc from '../../../../Containers/PdfDocument/LabelDoc.tsx';
import LetterOfAttendanceDoc from '../../../../Containers/PdfDocument/LetterOfAttendanceDoc.tsx';
import ReceiptDoc from '../../../../Containers/PdfDocument/ReceiptDoc.tsx';
import { useModal } from '../../../../hooks/useModal.ts';
import CustomModal from '../../../CustomModal/CustomModal.tsx';

interface Props extends ICellRendererParams {}

function CustomActionsCell(props: Props) {
	const { open, setOpen, onModalClose } = useModal({});
	const [typeOfDoc, setTypOfDoc] = useState('');

	const navigate = useNavigate();

	const navigateToPage = () => {
		navigate(`/registration-editing/studyInstanceUID/${props.data.studyInstanceUID}`, {
			state: { data: props.data },
		});
	};

	return (
		<>
			<Stack direction="row" spacing={1}>
				<Button
					sx={{
						backgroundColor: pink[600],
						'&:hover': {
							backgroundColor: pink[800], // 設定鼠標懸浮時的背景色
						},
					}}
					variant="contained"
					startIcon={<VisibilityIcon />}
					onClick={navigateToPage}
				>
					View
				</Button>
				<Button
					variant="contained"
					startIcon={<MarkAsUnreadIcon />}
					onClick={() => {
						setTypOfDoc('attendance');
						setOpen(true);
					}}
				>
					Attendance
				</Button>
				<Button
					variant="contained"
					startIcon={<ReceiptIcon />}
					onClick={() => {
						setTypOfDoc('receipt');
						setOpen(true);
					}}
				>
					Receipt
				</Button>
				<Button
					variant="contained"
					startIcon={<StickyNote2Icon />}
					onClick={() => {
						setTypOfDoc('label');
						setOpen(true);
					}}
				>
					Label
				</Button>
			</Stack>
			{/* PDF */}
			<CustomModal height="100%" open={open} onModalClose={() => onModalClose()}>
				<PDFViewer width="100%" height="100%" showToolbar>
					<Document>
						{typeOfDoc === 'receipt' ? <ReceiptDoc registration={props.data} /> : <></>}
						{typeOfDoc === 'attendance' ? <LetterOfAttendanceDoc registration={props.data} /> : <></>}
						{typeOfDoc === 'label' ? <LabelDoc registration={props.data} /> : <></>}
					</Document>
				</PDFViewer>
			</CustomModal>
		</>
	);
}

export default CustomActionsCell;
