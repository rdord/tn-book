import React from 'react';
import './Calendar.css';
import { startOfWeek, addDays, format } from 'date-fns';
import { daysInWeek } from '../../Constants';

const CalendarWeekdays = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const dayColumns = [];

  // Generate names of the days of the week
  for (let i = 0; i < daysInWeek; i++) {
    const currentDay = addDays(startDate, i);
    const formatedDay = format(currentDay, 'EEEE'); // Monday, Tuesday, ..., Sunday

    dayColumns.push(
      <div className='col col-center' key={currentDay.toString()}>
        {formatedDay}
      </div>
    );
  }

  return <div className='days row'>{dayColumns}</div>;
};

export default CalendarWeekdays;
