import { useEffect, useReducer } from "react";
import axios from "axios";

function useApplicationData(initialState) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_DAYS = "SET_DAYS";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers,
        };
      case SET_INTERVIEW: {
        return { ...state, appointments: action.value };
      }
      case SET_DAYS: {
        return { ...state, days: action.value };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    socket: null,
  });

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    // initial setup
    state.socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    state.socket.onmessage = (event) => {
      // Listen for the "SET_INTERVIEW" messages on the client.
      if (event.data.type === "SET_INTERVIEW") {
        dispatch({ type: SET_INTERVIEW, value: event.data.value });
      }
    };

    // use Promise.all() for multiple async calls
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((res) => {
        // res is an array of responses, index corresponds to the async call
        // set state of all states in the state object
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            days: res[0].data,
            appointments: res[1].data,
            interviewers: res[2].data,
          },
        });
      })
      .catch((err) => console.log(err));
  }, [initialState, state.socket]);

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

    const days = updateSpots(id, newState);

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        dispatch({ type: SET_INTERVIEW, value: appointments })
      )
      .then(() => dispatch({ type: SET_DAYS, value: days }));
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

    const days = updateSpots(id, newState);

    return axios
      .put(url, appointment)
      .then(() =>
        dispatch({ type: SET_INTERVIEW, value: appointments })
      )
      .then(() => dispatch({ type: SET_DAYS, value: days }));
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

export default useApplicationData;
