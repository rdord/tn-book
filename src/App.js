import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import TimePicker from './components/TimePicker/TimePicker';
import BookButton from './components/BookButton/BookButton';
import { appointmentDuration } from './Constants';
import { addHours, subHours, format } from 'date-fns';
import { GlobalProvider } from './context/GlobalState';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  // TODO: refactor and merge to selectedTime
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);

  // TODO: refactor to an {day: format(selectedDay, 'D'), times: []}
  const [unavailable, setUnavailable] = useState([]);

  const [appointments, setAppointments] = useState([]); // TODO: remove when saved to firebase

  const onDateClick = day => setSelectedDay(day);
  const onTimeClick = hour => setSelectedHour(hour);

  // const addUnavailableTimes = time => setUnavailable([...unavailable, time]);
  const addUnavailableTimes = time => {
    const day = format(time, 'DDD');
    const timeArray = [time];
    setUnavailable([...unavailable, { day, timeArray }]);

    // unavailable.forEach(t => {
    //   if (t.day === day) {
    //     t.times.push(time);
    //   }
    // });
  };

  const removeUnavailableTime = time => setUnavailable(unavailable.filter(t => t !== time));
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
        <Helmet>
          <title>book appointment with tesa naja</title>
        </Helmet>
        <button style={{ color: 'hotpink', float: 'right', margin: '10px 10px -30px' }} onClick={onAdminClick}>
          Admin
        </button>
        <Calendar selectedDay={selectedDay} onDateClick={onDateClick} isAdmin={isAdmin} />
        <TimePicker
          selectedDay={selectedDay}
          selectedHour={selectedHour}
          onTimeClick={onTimeClick}
          unavailable={unavailable}
          addUnavailableTimes={addUnavailableTimes}
          isAdmin={isAdmin}
        />
        <BookButton onBookClick={onBookClick} selectedHour={selectedHour} />
      </div>
    </GlobalProvider>
  );
}

export default App;
