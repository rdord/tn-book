import React, { useEffect } from 'react';
import './BookButton.css';
import { format, isDate } from 'date-fns';

const BookButton = ({ onBookClick, selectedHour, duration }) => {
  const appt = {
    start: selectedHour,
    duration: duration,
    title: selectedHour ? `${format(selectedHour, 'd.MMM.yy HH:mm')} appointment` : null,
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
