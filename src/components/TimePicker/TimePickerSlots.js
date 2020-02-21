import React from 'react';
import './TimePicker.css';
import {
  setHours,
  differenceInHours,
  addHours,
  format,
  roundToNearestMinutes,
  setMinutes,
  isBefore,
  isAfter
} from 'date-fns';

const TimePickerSlots = ({ workdayStart, workdayEnd, selectedDay, selectedHour, onTimeClick }) => {
  let startHour = setHours(selectedDay, workdayStart);
  let endHour = setHours(selectedDay, workdayEnd);
  let workdayLength = differenceInHours(endHour, startHour);

  const morning = [];
  const afternoon = [];
  const evening = [];
  const slots = { morning: [], afternoon: [], evening: [] };
  let hour = setMinutes(roundToNearestMinutes(startHour), 0);

  for (let i = 0; i <= workdayLength; i++) {
    const hourSlot = <div key={hour.toString()}>{format(hour, 'HH:mm')}</div>;

    if (isBefore(hour, setHours(selectedDay, 12))) {
      slots['morning'].push(hourSlot);
    } else if (isAfter(hour, setHours(selectedDay, 16))) {
      slots['evening'].push(hourSlot);
    } else {
      slots['afternoon'].push(hourSlot);
    }

    hour = addHours(hour, 1);
  }

  return (
    <div className='slots row'>
      <div className='col col-start'>{slots.morning}</div>
      <div className='col col-center'>{slots.afternoon}</div>
      <div className='col col-end'>{slots.evening}</div>
    </div>
  );
};

export default TimePickerSlots;
