import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  isAdmin: false,
  selectedDay: new Date(),
  selectedHour: null,
  unavailable: [],
  appointments: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions

  return (
    <GlobalContext.Provider
      value={{
        isAdmin: state.isAdmin,
        selectedDay: state.selectedDay,
        selectedHour: state.selectedHour,
        unavailable: state.unavailable,
        appointments: state.appointments
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
