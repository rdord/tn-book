import React from 'react';
import './Calendar.css';
import { startOfWeek, addDays, format } from 'date-fns';

const CalendarDays = ({ currentMonth }) => {
  const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(startDate, i);
    const formatedDay = format(day, 'EEEE');

    days.push(
      <div className='col col-center' key={day.toString()}>
        {formatedDay}
      </div>
    );
  }

  return <div className='days row'>{days}</div>;
};

export default CalendarDays;
