import React from 'react';
import DayListItem from './DayListItem';

function DayList(props) {
  let dayArr = [];

  props.days.map((day) => {
    dayArr.push(
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayArr}</ul>;
}

export default DayList;

// days:Array an array of objects
// day:String
// setDay:Function
