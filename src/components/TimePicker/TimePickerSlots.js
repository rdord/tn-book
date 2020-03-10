import React, { useContext } from 'react';
import './TimePicker.css';
import { differenceInHours, addHours, format, isBefore, isAfter, isSameHour, set } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { workdayStart, workdayEnd, breakBeforeBooking } from '../../Constants';
import { getHoursBetween } from '../../utils/utils';
import AppointmentStore from '../../stores/AppointmentStore';

const TimePickerSlots = observer(() => {
  const store = useContext(AppointmentStore);

  const startTime = set(store.selectedTime, { hours: workdayStart });
  const endTime = set(store.selectedTime, { hours: workdayEnd });
  const workdayLength = differenceInHours(endTime, startTime);

  const slots = { morning: [], afternoon: [], evening: [] };
  const morningEnds = set(store.selectedTime, { hours: 12, minutes: 1 });
  const eveningStarts = set(store.selectedTime, { hours: 16 });
  let time = set(startTime, { minutes: 0, seconds: 0 });

  const toggleUnavailableTime = (isDisabled, time) => {
    if (isDisabled) {
      store.removeUnavailableTime(time);
    } else {
      store.addUnavailableTime(time);
    }
  };

  for (let i = 0; i <= workdayLength; i++) {
    const isTimeSelected = isSameHour(time, store.selectedTime);
    const cloneTime = time;
    let isTimeUnavailable = false;

    store.allUnavailableTimes.find(t => (isTimeUnavailable = isSameHour(t, cloneTime)));

    const hoursInPast = isBefore(time, addHours(new Date(), breakBeforeBooking));
    const isTimeDisabled = isTimeUnavailable || hoursInPast;

    const hourSlot = (
      <div
        className={`slot ${isTimeDisabled ? 'disabled' : isTimeSelected && 'selected'}`}
        onClick={() => store.selectTime(cloneTime)}
        key={time.toString()}>
        {format(time, 'HH:mm')}

        {store.isAdmin && !hoursInPast && (
          <span className='disable-slot' onClick={() => toggleUnavailableTime(isTimeDisabled, cloneTime)}>
            x
          </span>
        )}
      </div>
    );

    if (isBefore(time, morningEnds)) {
      slots.morning.push(hourSlot);
    } else if (isAfter(time, eveningStarts)) {
      slots.evening.push(hourSlot);
    } else {
      slots.afternoon.push(hourSlot);
    }

    time = addHours(time, 1);
  }

  const setDayUnavailable = () => {
    const workingHoursInDay = getHoursBetween(startTime, endTime);
    store.addUnavailableDay(workingHoursInDay);
  };

  return (
    <div className='slots row'>
      {store.isAdmin && (
        <button
          type='button'
          style={{ color: 'hotpink', position: 'absolute', right: '10px', top: '-19px' }}
          onClick={setDayUnavailable}>
          Set day as unavailable
        </button>
      )}

      <div className='col col-start'>{slots.morning}</div>
      <div className='col col-center'>{slots.afternoon}</div>
      <div className='col col-end'>{slots.evening}</div>
    </div>
  );
});

export default TimePickerSlots;
