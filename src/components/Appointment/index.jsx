/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import "./styles.scss";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import Form from "./Form.jsx";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // !! save function
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview);
  };

  console.log("appointment props", props);

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
};

export default Appointment;
