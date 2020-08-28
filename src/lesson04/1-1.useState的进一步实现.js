import React from "react";
import ReactDom from "react-dom";

// 如果有多个state，那么不能使用一个lastState变量。因为后面的state会覆盖前面的state
// 因此我们需要定义一个数组来保存每个state最新的值，同时定义好索引，根据索引来获取值。
let lastStates = [];
let index = 0;
function useState(initialState) {
  let currentIndex = index;
  lastStates[currentIndex] = lastStates[currentIndex] || initialState;
  function setState(newState) {
    lastStates[currentIndex] = newState;
    render();
  }
  index += 1;
  return [lastStates[currentIndex], setState];
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
  // 必须确保每次渲染时，state对应的index是相同的，这样才能保证取的是之前的值
  // 因此，每次渲染时将index重新置空。这也是为什么不能在if,while等判断你语句中
  // 使用useState的原因，因为这样的话会导致一些情况下有这个state,一些情况下没有
  // 从而导致每次每个state对应的值不一致。
  index = 0;
  ReactDom.render(<Counter />, document.getElementById("root"));
}

render();
