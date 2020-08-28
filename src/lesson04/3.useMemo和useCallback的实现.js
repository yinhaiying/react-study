import React, { memo, useState } from "react";
import ReactDom from "react-dom";

function Child({ data, addNum }) {
  // 当修改input的时候，虽然只是修改了name。但是导致Child组件也进行了渲染。这样是不合理的。
  console.log("child render");
  return <button onClick={addNum}>{data.num}</button>;
}
Child = memo(Child);

// 自定义useCallback
let lastCallback;
let lastCallbackDependencies; // 上一次依赖项的结果
function useCallback(callback, dependencies) {
  if (lastCallbackDependencies) {
    //已经渲染过至少一次了
    // 判断上一次的值和这次的值是否一致
    const changed = !dependencies.every((item, index) => {
      // 新的依赖数组是否每一项都和老的依赖数组中的每一项相同。
      return item === lastCallbackDependencies[index];
    });
    if (changed) {
      lastCallback = callback;
      lastCallbackDependencies = dependencies;
    }
  } else {
    // 没有渲染过
    lastCallback = callback;
    lastCallbackDependencies = dependencies;
  }
  return lastCallback;
}

let lastMemo;
let lastMemoDependencies;
// 自定义useMemo
function useMemo(callback, dependencies) {
  if (lastMemoDependencies) {
    //已经渲染过至少一次了
    // 判断上一次的值和这次的值是否一致
    const changed = !dependencies.every((item, index) => {
      // 新的依赖数组是否每一项都和老的依赖数组中的每一项相同。
      return item === lastMemoDependencies[index];
    });
    if (changed) {
      lastMemo = callback();
      lastMemoDependencies = dependencies;
    }
  } else {
    // 没有渲染过
    lastMemo = callback();
    lastMemoDependencies = dependencies;
  }
  return lastMemo;
}
function App() {
  let [num, setNum] = useState(0);
  let [name, setName] = useState("hello");

  let addNum = useCallback(() => setNum(num + 1), [num]);
  let data = useMemo(() => ({ num }), [num]);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {JSON.stringify(name)}
      <Child data={data} addNum={addNum}></Child>
    </div>
  );
}
function render() {
  ReactDom.render(<App />, document.getElementById("root"));
}

render();
