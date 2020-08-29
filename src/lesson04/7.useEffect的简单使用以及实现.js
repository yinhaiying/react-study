import React, { useState } from "react";
import ReactDom from "react-dom";

// Effect是一个钩子，它会在组件渲染完成之后执行

let lastDependencies;
function useEffect(callback, dependencies) {
  if (lastDependencies) {
    let changed = !dependencies.every((item, index) => {
      return item === lastDependencies[index];
    });
    if (changed) {
      callback();
      lastDependencies = dependencies;
    }
  } else {
    // 上次结果没有值，表示没有执行过
    callback();
    lastDependencies = dependencies;
  }
}

const Counter = () => {
  const [name, setName] = useState("hello");
  const [num, setNum] = useState(0);
  useEffect(() => {
    console.log("effect执行");
    console.log("number:", num);
  }, [num]);
  return (
    <div>
      <p>姓名：{name}</p>
      <p>数字：{num}</p>
      <button
        onClick={() => {
          setName(name + "world");
        }}
      >
        changeName
      </button>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        add
      </button>
    </div>
  );
};

function render() {
  ReactDom.render(<Counter />, document.getElementById("root"));
}

render();
