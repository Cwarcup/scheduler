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

export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_DAYS,
  reducer,
};
