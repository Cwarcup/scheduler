/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import "./styles.scss";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import Form from "./Form.jsx";
import Status from "./Status";
import Confirm from "./Confirm.jsx";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  console.log("appointment props", props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // !! save function seems to be working
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function trashInterview() {
    if (mode === CONFIRM) {
      // if in confirm mode
      transition(DELETING); // transition to deleting mode

      props // only delete if in confirm mode
        .cancelInterview()
        .then(() => {
          transition(EMPTY);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // if not in confirm mode, transition to confirm mode
      transition(CONFIRM);
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => trashInterview()}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"Delete the appointment?"}
          onCancel={() => transition(SHOW)}
          onConfirm={trashInterview}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
};

export default Appointment;
