import { createContext } from 'react';
import { decorate, observable, computed, toJS } from 'mobx';
import { addMonths, subMonths, set, format, parse, startOfMonth, startOfWeek, endOfMonth, endOfWeek } from 'date-fns';

export class AppointmentStore {
  selectedTime = set(new Date(), { hours: 0 });
  unavailableTimes = [];
  isAdmin = true;
  appointments = [];

  get startDate() {
    const monthStart = startOfMonth(this.selectedTime);
    return startOfWeek(monthStart);
  }

  get endDate() {
    const monthEnd = endOfMonth(this.selectedTime);
    return endOfWeek(monthEnd);
  }

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
  addUnavailableTime = time => {
    const day = format(time, 'DDD');
    let dayExists = false;

    const updatedDay = this.unavailableTimes.map(obj => {
      if (obj.day === day) {
        dayExists = true;
        obj.times.push(time);
      }
      return obj;
    });

    if (dayExists) {
      this.unavailableTimes = updatedDay;
    } else {
      this.unavailableTimes.push({ day, times: [time] });
    }

    console.log('addUnavailableTime', toJS(this.unavailableTimes));
  };
  removeUnavailableTime = time => (this.unavailableTimes = this.unavailableTimes.filter(t => t !== time));

  addUnavailableTimes = times => {
    const concatDates = [...this.unavailableTimes, ...times];
    const concatStrings = concatDates.map(t => format(t, 'd. MMM yyyy - HH:mm'));
    const uniqueStrings = [...new Set(concatStrings)];
    const uniqueDates = uniqueStrings.map(t => parse(t, 'd. MMM yyyy - HH:mm', new Date()));

    this.unavailableTimes = uniqueDates;

    console.log(toJS(this.unavailableTimes));
  };
}

decorate(AppointmentStore, {
  selectedTime: observable,
  unavailableTimes: observable,
  isAdmin: observable,
  appointments: observable,
  startDate: computed,
  endDate: computed
});

export default createContext(new AppointmentStore());
