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
    console.log(toJS(this.unavailableTimes));
  };

  // removeUnavailableTime = time => (this.unavailableTimes = this.unavailableTimes.filter(t => t !== time));

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
