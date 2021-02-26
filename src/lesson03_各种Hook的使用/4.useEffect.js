import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
/* 
useEffect:简单的理解就是afterRender，当渲染的时候执行。
用官方的话来说是副作用：所谓副作用就是改变了不属于你组件内部的东西。
比如进行ajax请求，改变全局变量，设置title等。

- 可以使用多个useEffect
- useEffect的返回值是一个函数，用于组件销毁时执行
- 多个useEffect按照顺序执行
*/

function App() {
  const [n, setN] = useState(0);
  useEffect(() => {
    console.log("第一次的时候执行");
  }, []);
  useEffect(() => {
    console.log("n再次变化时候执行");
  }, [n]);
  useEffect(() => {
    let timer = setInterval(() => {
      console.log("hi");
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  const onClick = () => {
    setN((i) => i + 1);
  };
  return (
    <>
      n的值为： {n} <button onClick={onClick}> 点击 </button>{" "}
    </>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
