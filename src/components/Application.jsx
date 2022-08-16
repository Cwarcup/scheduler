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
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  // setup initial state from useApplicationData hook
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // array of interviewers for a given day. Passed to Appointment component.
  const interviewersForDay = getInterviewersForDay(state, state.day);

  // get appointments for the given day, use helper function. Returns an array of appointments.
  const appointments = getAppointmentsForDay(state, state.day);

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
        cancelInterview={() => cancelInterview(appointment.id)}
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
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
