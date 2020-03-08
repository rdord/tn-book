import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import TimePicker from './components/TimePicker/TimePicker';
import BookButton from './components/BookButton/BookButton';
import { observer } from 'mobx-react-lite';
import AppointmentStore from './stores/AppointmentStore';

// TODO: write react and mobx tests
// react: https://www.youtube.com/watch?v=3e1GHCA3GP0
// mobx: https://dev.to/ryands17/using-mobx-with-react-hooks-part---2-8ac
const App = observer(() => {
  const store = useContext(AppointmentStore);

  return (
    <div className='appointments'>
      <Helmet>
        <title>book appointment with tesa naja</title>
      </Helmet>
      <button className='admin-button' onClick={store.toggleAdmin}>
        Admin
      </button>
      <Calendar />
      <TimePicker />
      <BookButton />
    </div>
  );
});

export default App;
