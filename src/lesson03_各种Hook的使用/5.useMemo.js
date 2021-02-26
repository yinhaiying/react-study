import React, { useState, useMemo, useCallback } from "react";
import ReactDom from "react-dom";

function App() {
  console.log("App执行了");
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  const onClick = () => {
    setN(n + 1);
  };
  const onClick2 = () => {
    setM(m + 1);
  };

  // const onClickChild = () =>{}
  // 使用useMemo缓存需要使用的函数
  const onClickChild =useMemo(() => {
    return () => {}; // 返回之前的函数
  },[m])
  const onClickChild2 = useCallback(() => {}, [m]);

  return (
    <>
      n的值为：{n}
      <button onClick={onClick}>点击</button>
      <button onClick={onClick2}>修改M</button>
      <Child2 data={m} onClick={onClickChild} onClick2={onClickChild2} />
    </>
  );
}

function Child(props) {
  console.log("我又变了");
  return <div onClick={props.onClick}>child:{props.data}</div>;
}

const Child2 = React.memo(Child);
ReactDom.render(<App />, document.getElementById("root"));
