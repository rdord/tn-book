import React, { useEffect, useState } from 'react';
import './TimePicker.css';
import { differenceInHours, addHours, format, isBefore, isAfter, isSameHour, set } from 'date-fns';

const TimePickerSlots = ({
  workdayStart,
  workdayEnd,
  selectedDay,
  selectedHour,
  onTimeClick,
  unavailableHours,
  setUnavailable
}) => {
  let startHour = set(selectedDay, { hours: workdayStart });
  let endHour = set(selectedDay, { hours: workdayEnd });
  let workdayLength = differenceInHours(endHour, startHour);

  const slots = { morning: [], afternoon: [], evening: [] };
  const morningEnds = set(selectedDay, { hours: 12, minutes: 1 });
  const eveningStarts = set(selectedDay, { hours: 16 });
  let hour = set(startHour, { minutes: 0, seconds: 0 });

  useEffect(() => {
    console.log('selectedHour', selectedHour);
  }, [selectedHour]);

  useEffect(() => {
    console.log('unavailableHours', unavailableHours);
  }, [unavailableHours]);

  for (let i = 0; i <= workdayLength; i++) {
    const isSelectedHour = isSameHour(hour, selectedHour);
    const cloneHour = hour;
    let isUnavailableHour = false;

    unavailableHours.forEach(h => {
      if (isSameHour(h, cloneHour)) {
        isUnavailableHour = true;
        return;
      }
    });

    console.log('isUnavailableHour', isUnavailableHour);

    const hourSlot = (
      <div
        className={`slot ${isUnavailableHour ? 'disabled' : isSelectedHour ? 'selected' : ''}`}
        onClick={() => onTimeClick(cloneHour)}
        key={hour.toString()}>
        {format(hour, 'HH:mm')}
        <span className='disable-slot' onClick={() => setUnavailable([cloneHour])}>
          x
        </span>
      </div>
    );

    if (isBefore(hour, morningEnds)) {
      slots.morning.push(hourSlot);
    } else if (isAfter(hour, eveningStarts)) {
      slots.evening.push(hourSlot);
    } else {
      slots.afternoon.push(hourSlot);
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
