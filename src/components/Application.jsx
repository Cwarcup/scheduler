import React from "react";
import { useState, useEffect } from "react";

import "../styles/Application.scss";

import DayList from "./DayList.jsx";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors.jsx";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const setAppointments = (appointments) =>
    setState((prev) => ({ ...prev, appointments }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      // axios.get("/api/interviewers"),
    ])
      .then((res) => {
        // console.log(res[0].data); // days
        // console.log(res[1].data); // appointments
        // console.log(res[2].data); // interviewers

        setState((prev) => ({
          ...prev,
          days: res[0].data,
          appointments: res[1].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // create array of appointments for the day
  const appointmentArr = dailyAppointments.map((app) => {
    return <Appointment key={app.id} {...app} />;
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
        {appointmentArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
