import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(
    props.interviewer || null
  );
  const [error, setError] = useState("");

  // clear form values
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // when user clicks cancel button
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // validate the student and interviewer form field
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          autoComplete="off"
        >
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            name="name"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
