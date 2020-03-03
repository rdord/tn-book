import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import TimePicker from './components/TimePicker/TimePicker';
import BookButton from './components/BookButton/BookButton';
import { addHours, subHours } from 'date-fns';
import { GlobalProvider } from './context/GlobalState';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [workdayStart, setWorkdayStart] = useState(9);
  const [workdayEnd, setWorkdayEnd] = useState(19);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);

  // TODO: refactor to an {day: format(selectedDay, 'D'), times: []}
  const [unavailable, setUnavailable] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [appointmentDuration, setAppointmentDuration] = useState(3);

  const onDateClick = day => setSelectedDay(day);
  const onTimeClick = hour => setSelectedHour(hour);
  const setUnavailableTimes = hours => setUnavailable([...unavailable, ...hours]);
  const setDuration = hours => setAppointmentDuration(hours);
  const onAdminClick = status => setIsAdmin(!isAdmin);

  const onBookClick = appt => {
    const prevAppoimentDuration = appointmentDuration;
    let hour = subHours(appt.start, prevAppoimentDuration);
    let allHours = [];
    setAppointments([...appointments, appt]);

    for (let i = 0; i < appointmentDuration + prevAppoimentDuration; i++) {
      allHours.push(hour);
      hour = addHours(hour, 1);
    }

    setUnavailable(allHours);
  };

  useEffect(() => {
    console.log('unavailable', unavailable);
  }, [unavailable]);

  return (
    <GlobalProvider>
      <div className='App'>
        <button style={{ color: 'hotpink', float: 'right', margin: '10px 10px -30px' }} onClick={onAdminClick}>
          Admin
        </button>
        <Calendar
          workdayStart={workdayStart}
          workdayEnd={workdayEnd}
          selectedDay={selectedDay}
          onDateClick={onDateClick}
          isAdmin={isAdmin}
        />
        <TimePicker
          workdayStart={workdayStart}
          workdayEnd={workdayEnd}
          selectedDay={selectedDay}
          selectedHour={selectedHour}
          onTimeClick={onTimeClick}
          unavailable={unavailable}
          setUnavailableTimes={setUnavailableTimes}
          isAdmin={isAdmin}
        />
        <BookButton onBookClick={onBookClick} selectedHour={selectedHour} />
      </div>
    </GlobalProvider>
  );
}

export default App;
