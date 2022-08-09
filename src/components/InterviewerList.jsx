import React from "react";
import "../styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem.jsx";

function InterviewerList(props) {
  //build an array and insert InterviewerListItem for each interviewer
  const interviewerArr = props.interviewers.map(
    (int) => {
      return (
        <InterviewerListItem
          key={int.id}
          name={int.name}
          avatar={int.avatar}
          setInterviewer={() =>
            props.setInterviewer(int.id)
          }
          selected={int.id === props.interviewer}
        />
      );
    }
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewerArr}
      </ul>
    </section>
  );
}

export default InterviewerList;
