import React from "react";
import DayListItem from "./DayListItem.jsx";

function DayList(props) {
  const dayArr = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{dayArr}</ul>;
}

export default DayList;

// days:Array an array of objects
// day:String
// setDay:Function
