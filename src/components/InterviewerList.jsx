import React from "react";
import "../styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem.jsx";
import PropTypes from "prop-types";

function InterviewerList(props) {
  //build an array and insert InterviewerListItem for each interviewer
  const interviewerArr = props.interviewers.map((int) => {
    return (
      <InterviewerListItem
        key={int.id}
        name={int.name}
        avatar={int.avatar}
        selected={int.id === props.value}
        setInterviewer={() => props.onChange(int.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">{interviewerArr}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
