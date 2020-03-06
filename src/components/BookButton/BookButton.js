import React, { useEffect } from 'react';
import './BookButton.css';
import { appointmentDuration } from '../../Constants';
import { format, isDate } from 'date-fns';

const BookButton = ({ onBookClick, selectedHour }) => {
  const appt = {
    start: selectedHour,
    duration: appointmentDuration,
    title: selectedHour && `${format(selectedHour, 'd. MMM yyyy - HH:mm')} appointment`,
    description: ''
  };

  useEffect(() => {
    console.log('appt', appt);
  }, [appt]);

  return (
    <button onClick={() => onBookClick(appt)} disabled={!isDate(selectedHour)}>
      Book
    </button>
  );
};

export default BookButton;
