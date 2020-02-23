import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import TimePicker from './components/TimePicker/TimePicker';
import BookButton from './components/BookButton/BookButton';
import { addHours } from 'date-fns';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [workdayStart, setWorkdayStart] = useState(9);
  const [workdayEnd, setWorkdayEnd] = useState(19);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [unavailableHours, setUnavailableHours] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentDuration, setAppointmentDuration] = useState(3);

  const onDateClick = day => setSelectedDay(day);
  const onTimeClick = hour => setSelectedHour(hour);
  const setUnavailable = hours => setUnavailableHours([...unavailableHours, ...hours]);
  const setDuration = hours => setAppointmentDuration(hours);

  const onBookClick = appt => {
    let hour = appt.start;
    let allHours = [];
    setAppointments([...appointments, appt]);

    for (let i = 0; i < appointmentDuration; i++) {
      allHours.push(hour);
      hour = addHours(hour, 1);
    }

    setUnavailable(allHours);
  };

  useEffect(() => {
    console.log('unavailableHours', unavailableHours);
  }, [unavailableHours]);

  return (
    <div className='App'>
      <Calendar selectedDay={selectedDay} onDateClick={onDateClick} />
      <TimePicker
        workdayStart={workdayStart}
        workdayEnd={workdayEnd}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
        onTimeClick={onTimeClick}
        unavailableHours={unavailableHours}
        setUnavailable={setUnavailable}
      />
      <BookButton onBookClick={onBookClick} selectedHour={selectedHour} duration={appointmentDuration} />
    </div>
  );
}

export default App;
