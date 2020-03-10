import React, { useContext } from 'react';
import './Calendar.css';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  isBefore,
  isToday
} from 'date-fns';
import { observer } from 'mobx-react-lite';
import AppointmentStore from '../../stores/AppointmentStore';

const CalendarCells = observer(() => {
  const store = useContext(AppointmentStore);
  const monthStart = startOfMonth(store.selectedTime);
  const startDate = startOfWeek(monthStart);
  const monthEnd = endOfMonth(store.selectedTime);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day; // to remove the onDateClick warning
      const isCurrentMonthDay = isSameMonth(day, store.selectedTime);
      const isBeforeToday = isBefore(day, new Date());
      const isDisabledDay = !isCurrentMonthDay || (isBeforeToday && !isToday(day));
      const isSelectedDay = isSameDay(day, store.selectedTime);

      days.push(
        <div
          className={`col cell ${isDisabledDay ? 'disabled' : isSelectedDay && 'selected'}`}
          key={day.toString()}
          onClick={() => store.selectTime(cloneDay)}>
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
});

export default CalendarCells;
