// The function will return an array of appointments for the given day.
export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];

  const foundDay = state.days.find(({ name }) => name === day); // id of the appointment

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

// will return an object that contains the interview data
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  // student is string of the student's name
  const { student, interviewer } = interview;

  // state.interviewers is object with keys of all the interviewers
  // assign new obj using the key that matches the interviewer id that the interview obj has
  const interviewerObj = state.interviewers[interviewer];
  // return it all as a new object
  return { student, interviewer: interviewerObj };
}

//  provide the list of interviewers to the Form component
export function getInterviewersForDay(state, day) {
  let interviewersArr = [];

  const foundDay = state.days.find(({ name }) => name === day);

  if (foundDay) {
    for (const interviewer of foundDay.interviewers) {
      if (interviewer === state.interviewers[interviewer].id) {
        interviewersArr.push(state.interviewers[interviewer]);
      }
    }
  }

  return interviewersArr;
}
