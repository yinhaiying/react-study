import React from "react";
import ReactDom from "react-dom";

let state = [];
let index = 0;
function useState(initialState) {
  console.log("index", index);
  let currentIndex = index;
  state[currentIndex] = state[currentIndex] || initialState;
  function setState(newState) {
    state[currentIndex] = newState;
    render();
  }
  index += 1;
  return [state[currentIndex], setState];
}

function Counter() {
  let [count, setCount] = useState(0);
  let [num, setNum] = useState(0);
  // if (count % 2 == 0) {
  //   let [count1, setCount1] = useState(0);
  // }
  // if (num % 2 == 0) {
  //   let [num1, setNum1] = useState(0);
  // }

  return (
    <>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>+</button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

function render() {
  index = 0;
  ReactDom.render(<Counter />, document.getElementById("root"));
}

render();
