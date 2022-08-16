// responsible for loading the initial data from the API
// provides the actions to update the state, causing the component to render

import React, { useState, useEffect } from "react";
import axios from "axios";

function useApplicationData(initialState) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const setAppointments = (appointments) =>
    setState((prev) => ({ ...prev, appointments }));

  // !! // returns the day of the week you are on
  console.log("day", state.day);

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

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const deletePromise = new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointments/${id}`)
        .then((res) => {
          const newSpots = state.days.map((day) => {
            if (day.name === appointment.day) {
              return {
                spots: day.spots - 1,
              };
            } else {
              return day;
            }
          });
          console.log("newSpots", newSpots);
          setState({
            ...state,
            appointments,
          });

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    return deletePromise;
  };

  // async call to server to update the appointment
  const bookInterview = (id, interview) => {
    // copy the interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log("inside");
    console.log("appointment", appointment);
    console.log("id", id);

    setState((prev) => ({
      ...prev,
      appointments: appointments,
    }));

    const data = {
      interview: {
        student: interview.student,
        interviewer: interview.interviewer,
      },
    };

    // PUT request to update appointment with new interview using axios
    // endpoint is appointment ID
    const putRequestData = new Promise((resolve, reject) => {
      axios
        .put(`/api/appointments/${id}`, data)
        .then((res) => {
          setState((prev) => ({
            ...prev,
            appointments: appointments,
          }));
          resolve(res);
        })
        .catch((err) => reject(err));
    });
    return putRequestData;
  };

  console.log("state.days", state.days);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

export default useApplicationData;
