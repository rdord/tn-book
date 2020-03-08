import React, { useContext } from 'react';
import './Calendar.css';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import AppointmentStore from '../../stores/AppointmentStore';

const CalendarHeader = observer(() => {
  const store = useContext(AppointmentStore);

  return (
    <div className='header row'>
      <div className='col col-start'>
        <div className='icon' onClick={store.prevMonth}>
          chevron_left
        </div>
      </div>
      <div className='col col-center'>
        <span>{format(store.selectedTime, 'MMMM yyyy')}</span>
      </div>
      <div className='col col-end'>
        <div className='icon' onClick={store.nextMonth}>
          chevron_right
        </div>
      </div>
    </div>
  );
});

export default CalendarHeader;
