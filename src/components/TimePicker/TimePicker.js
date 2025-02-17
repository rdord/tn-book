import React from 'react';
import './TimePicker.css';
import TimePickerHeader from './TimePickerHeader';
import TimePickerSlots from './TimePickerSlots';

const TimePicker = props => {
  return (
    <div className='timepicker'>
      <TimePickerHeader />
      <TimePickerSlots />
    </div>
  );
};

export default TimePicker;
