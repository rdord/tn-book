import React, { useState } from 'react';
import './Calendar.css';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarCells from './CalendarCells';
import CalendarFooter from './CalendarFooter';
import { addMonths, subMonths } from 'date-fns';

const Calendar = props => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = day => setSelectedDay(day);

  return (
    <div className='calendar'>
      <CalendarHeader currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} />
      <CalendarDays currentMonth={currentMonth} />
      <CalendarCells currentMonth={currentMonth} selectedDay={selectedDay} onDateClick={onDateClick} />
      <CalendarFooter />
    </div>
  );
};

export default Calendar;
