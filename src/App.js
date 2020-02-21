import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import TimePicker from './components/TimePicker/TimePicker';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [workdayStart, setWorkdayStart] = useState(9);
  const [workdayEnd, setWorkdayEnd] = useState(19);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [unavailableHours, setUnavailableHours] = useState(null);

  const onDateClick = day => setSelectedDay(day);
  const onTimeClick = hour => setSelectedHour(hour);

  return (
    <div className='App'>
      <Calendar selectedDay={selectedDay} onDateClick={onDateClick} />
      <TimePicker
        workdayStart={workdayStart}
        workdayEnd={workdayEnd}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
        onTimeClick={onTimeClick}
      />
    </div>
  );
}

export default App;
