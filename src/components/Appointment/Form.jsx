import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(
    props.interviewer || null
  );

  console.log("form props", props);

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



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          autoComplete="off"
        >
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            value={student || props.name}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={(e) => setInterviewer(e)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => props.onSave(student, interviewer)}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
