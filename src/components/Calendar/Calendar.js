import React, { useState } from 'react';
import './Calendar.css';
import CalendarHeader from './CalendarHeader';
import CalendarWeekdays from './CalendarWeekdays';
import CalendarCells from './CalendarCells';
import { addMonths, subMonths } from 'date-fns';

const Calendar = props => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className='calendar'>
      <CalendarHeader currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} />
      <CalendarWeekdays currentMonth={currentMonth} />
      <CalendarCells currentMonth={currentMonth} {...props} />
    </div>
  );
};

export default Calendar;
