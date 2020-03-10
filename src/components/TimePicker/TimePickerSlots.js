import React, { useContext } from 'react';
import './TimePicker.css';
import { workdayStart, workdayEnd, breakBeforeBooking } from '../../Constants';
import { differenceInHours, addHours, format, isBefore, isAfter, isSameHour, set } from 'date-fns';
import { observer } from 'mobx-react-lite';
import AppointmentStore from '../../stores/AppointmentStore';
import { getHoursBetween } from '../../utils/utils';
import { toJS } from 'mobx';

const TimePickerSlots = observer(() => {
  const store = useContext(AppointmentStore);

  const startHour = set(store.selectedTime, { hours: workdayStart });
  const endHour = set(store.selectedTime, { hours: workdayEnd });
  const workdayLength = differenceInHours(endHour, startHour);

  const slots = { morning: [], afternoon: [], evening: [] };
  const morningEnds = set(store.selectedTime, { hours: 12, minutes: 1 });
  const eveningStarts = set(store.selectedTime, { hours: 16 });
  let hour = set(startHour, { minutes: 0, seconds: 0 });

  for (let i = 0; i <= workdayLength; i++) {
    const isSelectedHour = isSameHour(hour, store.selectedTime);
    const cloneHour = hour;
    let isUnavailableHour = false;

    store.allUnavailableTimes.find(time => (isUnavailableHour = isSameHour(time, cloneHour)));

    const hoursInPast = isBefore(hour, addHours(new Date(), breakBeforeBooking));
    const isDisabledHour = isUnavailableHour || hoursInPast;

    const hourSlot = (
      <div
        className={`slot ${isDisabledHour ? 'disabled' : isSelectedHour && 'selected'}`}
        onClick={() => store.selectTime(cloneHour)}
        key={hour.toString()}>
        {format(hour, 'HH:mm')}

        {store.isAdmin && (
          // TODO: handle toggle to enable the hourSlot back
          <span className='disable-slot' onClick={() => store.addUnavailableTime(cloneHour)}>
            x
          </span>
        )}
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
    const workingHoursInDay = getHoursBetween(startHour, endHour);
    store.addUnavailableDay(workingHoursInDay);
  };

  return (
    <div className='slots row'>
      {store.isAdmin && (
        <button
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
