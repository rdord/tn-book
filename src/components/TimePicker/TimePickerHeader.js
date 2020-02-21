import React from 'react';
import './TimePicker.css';

const TimePickerHeader = props => {
  return (
    <div className='header row'>
      <div className='col col-start'>Morning</div>
      <div className='col col-center'>Afternoon</div>
      <div className='col col-end'>Evening</div>
    </div>
  );
};

export default TimePickerHeader;
