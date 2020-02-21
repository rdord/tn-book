import React from 'react';
import './Calendar.css';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns';

const CalendarCells = ({ currentMonth, selectedDay, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const monthEnd = endOfMonth(currentMonth);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day; //to remove the onDateClick warning
      const isCurrentMonthDay = isSameMonth(day, currentMonth);
      const isSelectedDay = isSameDay(day, selectedDay);

      days.push(
        <div
          className={`col cell ${!isCurrentMonthDay ? 'disabled' : isSelectedDay ? 'selected' : ''}`}
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}>
          <span className='number'>{format(day, 'd')}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className='row' key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className='body'>{rows}</div>;
};

export default CalendarCells;
