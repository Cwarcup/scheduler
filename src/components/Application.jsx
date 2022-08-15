import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors.jsx";

export default function Application(props) {
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
  }, []);

  // async call to server to update the appointment
  const bookInterview = async (id, interview) => {
    // copy the interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

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

  // get appointments for the given day, use helper function. Returns an array of appointments.
  const appointments = getAppointmentsForDay(state, state.day);

  // array of interviewers for a given day. Passed to Appointment component.
  const interviewersForDay = getInterviewersForDay(state, state.day);

  // create an array of Appointment components for each appointment
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}
