import React, { useContext } from 'react';
import './Calendar.css';
import { addDays, format, isSameMonth, isSameDay, isBefore, isToday } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { daysInWeek } from '../../Constants';
import AppointmentStore from '../../stores/AppointmentStore';

const CalendarCells = observer(() => {
  const store = useContext(AppointmentStore);

  const calendarRows = [];
  let dayCells = [];
  let currentDay = store.startDate;

  // Generate cells for calendar days
  while (currentDay <= store.endDate) {
    for (let i = 0; i < daysInWeek; i++) {
      const isCurrentMonthDay = isSameMonth(currentDay, store.selectedTime);
      const isBeforeToday = isBefore(currentDay, new Date());
      const isDisabledDay = !isCurrentMonthDay || (isBeforeToday && !isToday(currentDay));
      const isSelectedDay = isSameDay(currentDay, store.selectedTime);
      const cloneDay = currentDay; // to remove the onDateClick warning

      dayCells.push(
        <div
          className={`col cell ${isDisabledDay ? 'disabled' : isSelectedDay && 'selected'}`}
          key={currentDay.toString()}
          onClick={() => store.selectTime(cloneDay)}>
          <span className='number'>{format(currentDay, 'd')}</span>
        </div>
      );
      currentDay = addDays(currentDay, 1);
    }
    calendarRows.push(
      <div className='row' key={currentDay.toString()}>
        {dayCells}
      </div>
    );
    dayCells = [];
  }

  return <div className='body'>{calendarRows}</div>;
});

export default CalendarCells;
