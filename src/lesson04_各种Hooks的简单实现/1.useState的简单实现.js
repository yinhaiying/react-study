import React from "react";
import ReactDom from "react-dom";

// useState的简单实现
let lastState;
function useState(initialState) {
  // lastState有值，表示不是第一次渲染了。
  lastState = lastState || initialState;
  function setState(newState) {
    lastState = newState;
    render();
  }
  return [lastState, setState];
}
// useState的简单实现结束

function Counter() {
  let [state, setState] = useState(0);
  return (
    <>
      <p>{state}</p>
      <button onClick={() => setState(state + 1)}>+</button>
    </>
  );
}

function render() {
  ReactDom.render(<Counter />, document.getElementById("root"));
}

render();
