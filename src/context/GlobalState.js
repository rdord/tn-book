import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  isAdmin: false,
  workdayStart: 9,
  workdayEnd: 19,
  selectedDay: new Date(),
  selectedHour: null,
  unavailableHours: [],
  appointments: [],
  appointmentDuration: 3
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions

  return (
    <GlobalContext.Provider
      value={{
        isAdmin: state.isAdmin,
        workdayStart: state.workdayStart,
        workdayEnd: state.workdayEnd,
        selectedDay: state.selectedDay,
        selectedHour: state.selectedHour,
        unavailableHours: state.unavailableHours,
        appointments: state.appointments,
        appointmentDuration: state.appointmentDuration
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
