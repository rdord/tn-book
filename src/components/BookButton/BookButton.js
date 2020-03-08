import React, { useContext } from 'react';
import './BookButton.css';
import { appointmentDuration } from '../../Constants';
import { format, isDate } from 'date-fns';
import { observer } from 'mobx-react-lite';
import AppointmentStore from '../../stores/AppointmentStore';
import { addHours, subHours } from 'date-fns';

const BookButton = observer(() => {
  const store = useContext(AppointmentStore);
  const appt = {
    start: store.selectedTime,
    duration: appointmentDuration,
    title: store.selectedTime && `${format(store.selectedTime, 'd. MMM yyyy - HH:mm')} appointment`,
    description: ''
  };

  const onBookClick = appt => {
    const prevAppoimentDuration = appointmentDuration;
    let hour = subHours(appt.start, prevAppoimentDuration);
    let allHours = [];
    store.addAppointment(appt);

    for (let i = 0; i < appointmentDuration + prevAppoimentDuration; i++) {
      allHours.push(hour);
      hour = addHours(hour, 1);
    }

    allHours.forEach(h => store.addUnavailableTime(h));
  };

  return (
    <button onClick={() => onBookClick(appt)} disabled={!isDate(store.selectedTime)}>
      Book
    </button>
  );
});

export default BookButton;
