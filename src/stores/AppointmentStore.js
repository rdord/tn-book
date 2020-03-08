import { createContext } from 'react';
import { decorate, observable } from 'mobx';
import { addMonths, subMonths, set, format, parse } from 'date-fns';

export class AppointmentStore {
  selectedTime = set(new Date(), { hours: 0 });
  unavailableTimes = [];
  isAdmin = true;
  appointments = [];

  // UI
  toggleAdmin = () => (this.isAdmin = !this.isAdmin);

  // calendar
  nextMonth = () => (this.selectedTime = addMonths(this.selectedTime, 1));
  prevMonth = () => (this.selectedTime = subMonths(this.selectedTime, 1));

  // appointments
  selectTime = time => (this.selectedTime = time);
  addAppointment = appt => this.appointments.push(appt);
  removeAppointment = appt => (this.appointments = this.appointments.filter(a => a !== appt));

  // TODO: refactor to an {day: format(selectedDay, 'D'), times: []}
  addUnavailableTime = time => this.unavailableTimes.push(time);
  removeUnavailableTime = time => (this.unavailableTimes = this.unavailableTimes.filter(t => t !== time));

  addUnavailableTimes = times => {
    const concatDates = [...this.unavailableTimes, ...times];
    const concatStrings = concatDates.map(t => format(t, 'd. MMM yyyy - HH:mm'));
    const uniqueStrings = [...new Set(concatStrings)];
    const uniqueDates = uniqueStrings.map(t => parse(t, 'd. MMM yyyy - HH:mm', new Date()));

    this.unavailableTimes = uniqueDates;
  };
}

decorate(AppointmentStore, {
  selectedTime: observable,
  unavailableTimes: observable,
  isAdmin: observable,
  appointments: observable
});

export default createContext(new AppointmentStore());
