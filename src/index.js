import React, { useRef, useState } from "react";
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

let lastLayoutDependencies;
function useLayoutEffect(callback, dependencies) {
  if (lastDependencies) {
    let changed = !dependencies.every((item, index) => {
      return item === lastLayoutDependencies[index];
    });
    if (changed) {
      Promise.resolve().then(callback);
      lastLayoutDependencies = dependencies;
    }
  } else {
    // 上次结果没有值，表示没有执行过
    Promise.resolve().then(callback);
    lastLayoutDependencies = dependencies;
  }
}

function Animation() {
  const animationRef = useRef();
  // useEffect(() => {
  //   // useEffect是在浏览器渲染完成之后执行，不会阻断浏览器的执行
  //   console.log("useEffect");
  //   animationRef.current.style.transform = "translate(500px";
  //   animationRef.current.style.transition = "all 500ms";
  // });
  useLayoutEffect(() => {
    // useLayoutEffect会阻断浏览器的执行
    // while (true) {}
    console.log("useLayoutEffect");
    animationRef.current.style.transform = "translate(500px";
    animationRef.current.style.transition = "all 500ms";
  });
  let style = {
    width: "100px",
    height: "100px",
    backgroundColor: "red",
  };
  console.log("render");
  return (
    <div style={style} ref={animationRef}>
      内容
    </div>
  );
}

function render() {
  ReactDom.render(<Animation />, document.getElementById("root"));
}

render();
