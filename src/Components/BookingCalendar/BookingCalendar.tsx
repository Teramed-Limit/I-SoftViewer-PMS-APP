import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@mui/material';
import { formatISO } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import { zhTW } from 'date-fns/locale';
import parse from 'date-fns/parse';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './BookingCalendar.module.scss';
import './Calendar-extend.scss';
import startOfWeek from 'date-fns/startOfWeek';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import { define } from '../../constant/setting-define';
import { useModal } from '../../hooks/useModal';
import { BookingEntity } from '../../interface/booking';
import { OperationType } from '../../interface/operation-type.ts';
import { atomSite } from '../../recoil/atoms/site';
import { http } from '../../utils/api/api';
import { generateUUID } from '../../utils/general';
import CustomModal from '../CustomModal/CustomModal';
import FormEditorV2 from '../FormEditorV2/FormEditorV2';

function convertToTaipeiTimezone(date: Date) {
	// 定義台北時區
	const timeZone = 'Asia/Taipei';
	// 將ISO格式的日期字符串轉換為UTC日期
	const utcDate = zonedTimeToUtc(date, timeZone);
	// 將UTC日期轉換為台北時區的日期
	const taipeiDate = utcToZonedTime(utcDate, timeZone);
	// 格式化日期為ISO字符串
	return formatISO(taipeiDate);
}

function BookingCalendar() {
	const calendarRef = useRef(null);
	const { open, setOpen, onModalClose } = useModal({});

	const methods = useForm<BookingEntity>();

	// 預約事件
	const site = useRecoilValue(atomSite);
	const [operationType, setOperationType] = useState(OperationType.Insert);
	const [events, setEvents] = useState<Event[]>([]);

	// 當事件時間改變時的處理函數
	const onEventTimeChange = ({ event, start, end }) => {
		const newBookingData = {
			...event.resource,
			startDatetime: convertToTaipeiTimezone(new Date(start)),
			endDatetime: convertToTaipeiTimezone(new Date(end)),
		};

		http.put(`/booking/${event.resource?.bookId}`, newBookingData).subscribe(() => {
			setEvents((currentEvents) => {
				return currentEvents.map((existingEvent) => {
					if (existingEvent === event) {
						return {
							...existingEvent,
							start: new Date(start),
							end: new Date(end),
							resource: newBookingData,
						};
					}
					return existingEvent;
				});
			});
		});
	};

	// 當事件調整大小時的處理函數
	const onEventResize: withDragAndDropProps['onEventResize'] = ({ event, start, end }) => {
		onEventTimeChange({ event, start, end });
	};

	// 當事件被拖放到新的時間時的處理函數
	const onEventDrop: withDragAndDropProps['onEventDrop'] = ({ event, start, end }) => {
		onEventTimeChange({ event, start, end });
	};

	// @ts-expect-error，有些類型沒有用到
	const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
		return {
			style: {
				color: 'white',
				backgroundColor: (event.resource as BookingEntity).modality === 'US' ? '#3174ad' : '#ffa500',
			},
		};
	};

	// Handler for date change to update the displayed events
	// const onNavigate = (newDate: Date, view: View, action: NavigateAction) => {
	// console.log(newDate, view, action);
	// };

	// 預設日期和時間
	const { defaultDate, scrollToTime } = useMemo(
		() => ({
			defaultDate: new Date(),
			scrollToTime: new Date(),
		}),
		[],
	);

	// 點擊預約事件
	const handleSelectEvent = useCallback(
		(event: Event) => {
			setOperationType(OperationType.Update);
			methods.reset(event.resource);
			setOpen(true);
		},
		[methods, setOpen],
	);

	// 開啟預約編輯器
	const onOpenBookingEditor = useCallback(
		({ start, end, slots }) => {
			// 如果是全天事件，則不開啟編輯器
			if (slots.length === 1) return;

			setOpen(true);
			setOperationType(OperationType.Insert);
			const initialBookingData: BookingEntity = {
				bookId: generateUUID(),
				startDatetime: new Date(start),
				endDatetime: new Date(end),
				patientId: '',
				patientName: '',
				patientCHName: '',
				patientSex: 'M',
				modality: 'US',
				contactPhone: '',
				referringPhysician: '',
				siteId: site.siteId,
				isRegister: false,
				remark: '',
			};
			methods.reset(initialBookingData);
		},
		[methods, site, setOpen],
	);

	// 新增預約事件
	const onHandleBooking = (formData: BookingEntity) => {
		const mutateData = {
			...formData,
			startDatetime: convertToTaipeiTimezone(formData.startDatetime),
			endDatetime: convertToTaipeiTimezone(formData.endDatetime),
		};

		switch (operationType) {
			case OperationType.Insert:
				// 處理插入邏輯
				http.post('/booking', mutateData).subscribe(() => {
					const title = formData.remark
						? `${formData.modality} - ${formData.patientName} (${formData.remark})`
						: `${formData.modality} - ${formData.patientName}`;

					setEvents((currentEvents) => {
						return [
							...currentEvents,
							{
								title,
								start: formData.startDatetime,
								end: formData.endDatetime,
								allDay: false,
								resource: formData,
							},
						];
					});
				});
				break;
			case OperationType.Update:
				// 處理更新邏輯
				http.put(`/booking/${methods.getValues()?.bookId}`, mutateData).subscribe(() => {
					setEvents((currentEvents) => {
						return currentEvents.map((existingEvent) => {
							if (existingEvent.resource?.bookId === formData.bookId) {
								const title = formData.remark
									? `${formData.modality} - ${formData.patientName} (${formData.remark})`
									: `${formData.modality} - ${formData.patientName}`;
								return {
									...existingEvent,
									title,
									start: new Date(formData.startDatetime),
									end: new Date(formData.endDatetime),
									allDay: false,
									resource: formData,
								};
							}
							return existingEvent;
						});
					});
				});
				break;
			default:
				break;
		}

		onModalClose();
	};

	// 刪除預約事件
	const onDeleteBooking = (e) => {
		e.stopPropagation();
		const bookingData = methods.getValues();
		if (!bookingData?.bookId) return;
		http.del(`/booking/${bookingData?.bookId}`).subscribe(() => {
			setEvents((currentEvents) => {
				return currentEvents.filter((event) => event.resource?.bookId !== bookingData?.bookId);
			});
			onModalClose();
		});
	};

	// 取得預約事件
	useEffect(() => {
		if (!site) return;
		http.get<BookingEntity[]>(`/booking/site/${site.siteId}`).subscribe((res) => {
			setEvents(
				res.map((booking) => ({
					title: booking.remark
						? `${booking.modality} - ${booking.patientName} (${booking.remark})`
						: `${booking.modality} - ${booking.patientName}`,
					start: new Date(booking.startDatetime),
					end: new Date(booking.endDatetime),
					allDay: false,
					resource: booking,
				})),
			);
		});
	}, [site]);

	return (
		<>
			<DnDCalendar
				ref={calendarRef}
				defaultView="week"
				defaultDate={defaultDate}
				step={10}
				timeslots={2}
				events={events}
				localizer={localizer}
				onEventDrop={onEventDrop}
				onEventResize={onEventResize}
				onDoubleClickEvent={handleSelectEvent}
				onSelectSlot={onOpenBookingEditor}
				// onNavigate={onNavigate}
				drilldownView="agenda"
				resizable
				selectable
				scrollToTime={scrollToTime}
				eventPropGetter={(event: Event, start: Date, end: Date, isSelected: boolean) =>
					eventStyleGetter(event, start, end, isSelected)
				}
			/>
			<CustomModal width="20%" label="Booking" open={open} onModalClose={() => onModalClose()}>
				<FormProvider {...methods}>
					<FormEditorV2 formDef={define.booking} formDataChanged={onHandleBooking}>
						{operationType === OperationType.Insert ? null : (
							<>
								<Button
									sx={{ mt: 1 }}
									variant="contained"
									color="error"
									onClick={(e) => onDeleteBooking(e)}
								>
									Delete
								</Button>
							</>
						)}
						<Button type="submit" variant="contained" color="primary">
							{operationType === OperationType.Insert ? 'Reserve' : 'Update'}
						</Button>
					</FormEditorV2>
				</FormProvider>
			</CustomModal>
		</>
	);
}

const locales = {
	'zh-TW': zhTW,
};

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

export default BookingCalendar;
