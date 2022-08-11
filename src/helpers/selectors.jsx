// The function will return an array of appointments for the given day.
// getAppointmentsForDay returns:
// [ { id: 1, time: "12pm", interview: null }, ... ]
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

// will return an object that contains the interview data
// if it is passed an object that contains an interviewer.
// getInterview returns:
// {
//   "student": "Lydia Miller-Jones",
//   "interviewer": {
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  // interviewer is an id
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

  // id of the appointment
  const foundDay = state.days.find(({ name }) => name === day);

  // compare foundDay's id matches the id of states.appointments
  if (foundDay) {
    for (const interviewer of foundDay.interviewers) {
      if (interviewer === state.interviewers[interviewer].id) {
        interviewersArr.push(state.interviewers[interviewer]);
      }
    }
  }

  return interviewersArr;
}
// returns:
// [
//   { id: 4, time: '3pm', interview: null },
//   {
//     id: 5,
//     time: '4pm',
//     interview: { student: 'Chad Takahashi', interviewer: 2 }
//   }
// ]

