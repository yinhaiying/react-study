import React from "react";
import ReactDom from "react-dom";

// 老的状态state，动作action，一个普通的对象
const reducer = (state, action) => {
  if (action.type === "add") {
    return state + 1;
  } else {
    return state;
  }
};
let lastState;

function useReducer(reducer, initialState) {
  lastState = lastState || initialState;

  function dispatch(action) {
    lastState = reducer(lastState, action);
    render();
  }
  return [lastState, dispatch];
}

// {type：'add'}就是action是一个普通对象
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: "add" })}>add</button>
    </div>
  );
};
function render() {
  ReactDom.render(<Counter />, document.getElementById("root"));
}

render();
