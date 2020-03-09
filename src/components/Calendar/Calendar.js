import React from 'react';
import './Calendar.css';
import CalendarHeader from './CalendarHeader';
import CalendarWeekdays from './CalendarWeekdays';
import CalendarCells from './CalendarCells';

const Calendar = () => {
  return (
    <div className='calendar'>
      <CalendarHeader />
      <CalendarWeekdays />
      <CalendarCells />
    </div>
  );
};

export default Calendar;
