/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import "./styles.scss";
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import Form from "./Form.jsx";
import Status from "./Status";
import Confirm from "./Confirm.jsx";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        // if error, set  ERROR_SAVE
        transition(ERROR_SAVE, true);
      });
  };

  const trashInterview = () => {
    if (mode === CONFIRM) {
      // if in confirm mode
      transition(DELETING, true); // transition to deleting mode

      props // only delete if in confirm mode
        .cancelInterview()
        .then(() => {
          transition(EMPTY);
        })
        .catch((err) => {
          // if error, ERROR_DELETE
          transition(ERROR_DELETE, true);
        });
    } else {
      // if not in confirm mode, transition to confirm mode
      transition(CONFIRM);
    }
  };

  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === ERROR_SAVE && (
        <Error
          onClose={() => back()}
          message="Could not save appointment"
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          onClose={() => back()}
          message="Could not delete appointment"
        />
      )}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => trashInterview()}
          onEdit={() => edit()}
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

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
};

export default Appointment;
