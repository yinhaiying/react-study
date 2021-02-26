import React, { useState, useRef } from "react";
import ReactDom from "react-dom";

function App() {
  console.log("App执行了");
  // const [n, setN] = useState(0);
  const nRef = useRef(0); // {current:0}
  const update = useState(null)[1];
  const setLog = () => {
    setTimeout(() => {
      console.log("n:", nRef.current);
    }, 3000);
  };
  return (
    <>
      n的值为：{nRef.current}
      <button
        onClick={() => {
          nRef.current += 1;
          update(nRef.current);
        }}
      >
        点击n
      </button>
      <button onClick={setLog}>点击Log</button>
    </>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
