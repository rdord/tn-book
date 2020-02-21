import React from 'react';
import './Calendar.css';
import { format } from 'date-fns';

const CalendarHeader = ({ currentMonth, nextMonth, prevMonth }) => (
  <div className='header row'>
    <div className='col col-start'>
      <div className='icon' onClick={prevMonth}>
        chevron_left
      </div>
    </div>
    <div className='col col-center'>
      <span>{format(currentMonth, 'MMMM yyyy')}</span>
    </div>
    <div className='col col-end'>
      <div className='icon' onClick={nextMonth}>
        chevron_right
      </div>
    </div>
  </div>
);

export default CalendarHeader;
