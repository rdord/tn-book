import { createContext } from 'react';
import { decorate, observable, computed, toJS } from 'mobx';
import {
  addMonths,
  subMonths,
  set,
  format,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  isSameHour
} from 'date-fns';

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

  get allUnavailableTimes() {
    return this.unavailableTimes.reduce((arr, obj) => [...arr, ...obj.times], []);
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
  };

  removeUnavailableTime = time => {
    const day = format(time, 'DDD');
    let emptyDayIndex = null;

    const updatedDay = this.unavailableTimes.map((obj, i) => {
      if (obj.day === day) {
        obj.times = obj.times.filter(t => !isSameHour(t, time));

        if (obj.times.length < 1) {
          emptyDayIndex = i;
        }
      }
      return obj;
    });

    if (emptyDayIndex !== null) {
      updatedDay.splice(emptyDayIndex, 1);
    }

    this.unavailableTimes = updatedDay;
  };

  addUnavailableDay = times => {
    const day = format(times[0], 'DDD');
    let existingDayIndex = null;
    const dayExists = this.unavailableTimes.find((obj, i) => {
      if (obj.day === day) {
        existingDayIndex = i;
        return true;
      }
      return false;
    });

    if (dayExists) {
      this.unavailableTimes.splice(existingDayIndex, 1);
    }

    this.unavailableTimes.push({ day, times });
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
