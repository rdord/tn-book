import React, { useEffect, useContext } from 'react';
import './BookButton.css';
import { format, isDate } from 'date-fns';
import { GlobalContext } from '../../context/GlobalState';

const BookButton = ({ onBookClick, selectedHour }) => {
  const { appointmentDuration } = useContext(GlobalContext);

  const appt = {
    start: selectedHour,
    duration: appointmentDuration,
    title: selectedHour && `${format(selectedHour, 'd.MMM.yy HH:mm')} appointment`,
    description: ''
  };

  // useEffect(() => {
  //   console.log('appt', appt);
  // }, [appt]);

  return (
    <button onClick={() => onBookClick(appt)} disabled={!isDate(selectedHour)}>
      Book
    </button>
  );
};

export default BookButton;
