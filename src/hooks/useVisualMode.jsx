import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //update the mode state with the new value.
  //  When replace is true then set the history to reflect that we are replacing the current mode.
  const transition = (nextMode, replace = false) => {
    if (replace) {
      const replacedHistory = [...history]; //copy the history array
      replacedHistory[replacedHistory.length - 1] = nextMode; //replace the last element in the array with the nextMode

      setMode(nextMode); //update the mode state
      setHistory([...replacedHistory]); //update the history state
    } else {
      setMode(nextMode);
      // add the new mode to the history array.
      setHistory([...history, nextMode]);
    }
  };

  // set the mode to the previous item in our history array.
  const back = () => {
    // if history is empty or less than 1, return to the initial mode.
    if (history.length <= 1) {
      setMode(initial);
      setHistory([initial]);
    } else {
      let newHistory = [...history]; // create a copy of the history array.
      newHistory.pop(); // remove the last item in the array.

      // update the state with the new history array.
      setHistory(newHistory); // update the state with the new history array.
      setMode(newHistory[newHistory.length - 1]); // set the mode to the last item in the array.
    }
  };

  return {
    mode,
    transition,
    back,
  };
}
