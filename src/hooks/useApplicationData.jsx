import { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData(initialState) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    // use Promise.all() for multiple async calls
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((res) => {
        // res is an array of responses, index corresponds to the async call

        // set state of all states in the state object
        setState((prev) => ({
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
          interviewers: res[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, [initialState]);

  const updateSpots = function (id, state) {
    // find the day using the id
    const currentDay = state.days.find((day) =>
      day.appointments.includes(id)
    );

    // find number of spots available for the day
    const nullAppointments = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    );
    // set spots to the number of null appointments
    const spots = nullAppointments.length;

    // copy, but don't mutate the state
    const newDay = { ...currentDay, spots };
    const newDays = state.days.map((day) => {
      return day.name === state.day ? newDay : day;
    });

    // update the state
    setState({ ...state, days: newDays });

    return newDays;
  };

  // trash the appointment
  const cancelInterview = (id) => {
    // set the appointment to null for a given id
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    // create the appointment with the null interview
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // new state object
    const newState = {
      ...state,
      appointments,
    };
    const url = `/api/appointments/${id}`;
    return axios.delete(url).then(() => {
      updateSpots(id, newState);
    });
  };

  // create a new appointment
  const bookInterview = (id, interview) => {
    // create new single appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    // create appointments with the new interview
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // new state object
    const newState = {
      ...state,
      appointments,
    };

    const url = `/api/appointments/${id}`;

    return axios.put(url, appointment).then(() => {
      updateSpots(id, newState);
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

export default useApplicationData;
