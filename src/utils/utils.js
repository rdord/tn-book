import { differenceInHours, addHours, set } from 'date-fns';

export const getHoursBetween = (startHour, endHour) => {
  const allWorkingHours = [];
  const workdayLength = differenceInHours(endHour, startHour);
  let oneHour = set(startHour, { minutes: 0, seconds: 0 });

  for (let i = 0; i <= workdayLength; i++) {
    allWorkingHours.push(oneHour);
    oneHour = addHours(oneHour, 1);
  }

  return allWorkingHours;
};
