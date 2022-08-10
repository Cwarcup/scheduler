// The function will return an array of appointments for the given day.

export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];

  // id of the appointment
  const foundDay = state.days.find(({ name }) => name === day);

  // compare foundDay's id matches the id of states.appointments
  if (foundDay) {
    for (const appointment of foundDay.appointments) {
      if (appointment === state.appointments[appointment].id) {
        appointmentArr.push(state.appointments[appointment]);
      }
    }
  }

  return appointmentArr;
}
