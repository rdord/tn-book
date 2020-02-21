import React from 'react';
import './Calendar.css';
import { startOfWeek, addDays, format } from 'date-fns';

const CalendarDays = ({ currentMonth }) => {
  const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(startDate, i);
    const formatedDay = format(day, 'EEEE');
    days.push(formatedDay);
  }

  return (
    <div className='days row'>
      {days.map((day, i) => (
        <div className='col col-center' key={i}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;
