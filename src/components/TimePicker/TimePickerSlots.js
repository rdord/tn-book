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
  setUnavailable,
  isAdmin
}) => {
  const startHour = set(selectedDay, { hours: workdayStart });
  const endHour = set(selectedDay, { hours: workdayEnd });
  const workdayLength = differenceInHours(endHour, startHour);
  const allWorkingHours = [];

  const slots = { morning: [], afternoon: [], evening: [] };
  const morningEnds = set(selectedDay, { hours: 12, minutes: 1 });
  const eveningStarts = set(selectedDay, { hours: 16 });
  let hour = set(startHour, { minutes: 0, seconds: 0 });

  useEffect(() => {
    console.log('selectedHour', selectedHour);
  }, [selectedHour]);

  useEffect(() => {
    console.log('allWorkingHours', allWorkingHours);
  }, [allWorkingHours]);

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

        {isAdmin ? (
          <span className='disable-slot' onClick={() => setUnavailable([cloneHour])}>
            x
          </span>
        ) : null}
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

  const setDayUnavailable = () => {
    if (isAdmin) {
      let oneHour = set(startHour, { minutes: 0, seconds: 0 });
      for (let i = 0; i <= workdayLength; i++) {
        allWorkingHours.push(oneHour);
        oneHour = addHours(oneHour, 1);
      }
    }

    unavailableHours.forEach(uHour => {
      allWorkingHours.forEach((wHour, index) => {
        if (isSameHour(uHour, wHour)) {
          allWorkingHours.splice(index, 1);
        }
      });
    });

    setUnavailable(allWorkingHours);
  };

  return (
    <div className='slots row'>
      {isAdmin ? (
        <button
          style={{ color: 'hotpink', position: 'absolute', right: '10px', top: '-19px' }}
          onClick={setDayUnavailable}>
          Set day as unavailable
        </button>
      ) : null}

      <div className='col col-start'>{slots.morning}</div>
      <div className='col col-center'>{slots.afternoon}</div>
      <div className='col col-end'>{slots.evening}</div>
    </div>
  );
};

export default TimePickerSlots;
