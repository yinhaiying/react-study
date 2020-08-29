/* 
React 的函数组件默认不会根据传入的 props 是否变化选择跳过渲染，也就是说主要组件进行了渲染。
那么React的函数子组件就会进行渲染，这带来了很大的开销。
memo用来包括一个组件。记忆组件
useMemo用来优化一个变量。通过useMemo包裹的变量，根据依赖发生变化。
useCallback用来优化一个函数。通过useCallback包裹的函数，根据依赖发生变化。


*/

import React, { memo, useState, useMemo, useCallback } from "react";
import ReactDom from "react-dom";

function Child({ data, addNum }) {
  // 当修改input的时候，虽然只是修改了name。但是导致Child组件也进行了渲染。这样是不合理的。
  console.log("child render");
  return <button onClick={addNum}>{data.num}</button>;
}
Child = memo(Child);

/* 
input输入框中的值变化时，重新渲染。App执行会生成一个新的num,name,addNum和data。
这时候，如果我们不希望他们生成新的变量或者函数。那么可以使用useMemo和useCallback。
其中如果是变量那么使用useMemo，如果是函数使用useCallback。


*/
// function App() {
//   let [num, setNum] = useState(0);
//   let [name, setName] = useState("hello");
//   let addNum = () => setNum(num + 1);
//   let data = { num };
//   return (
//     <div>
//       <input
//         type="text"
//         value={name}
//         onChange={(event) => setName(event.target.value)}
//       />
//       <Child data={data} addNum={addNum}></Child>
//     </div>
//   );
// }

// 使用useMemo和useCallback进行优化
// 如果我们不希望他们生成新的变量或者函数。那么可以使用useMemo和useCallback。
// 其中如果是变量那么使用useMemo，如果是函数使用useCallback。
// useCallback参数是一个函数，将这个参数作为返回值赋值给变量
// useMemo 参数是一个函数，但是是将函数的返回值赋值给变量
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

ReactDom.render(<App />, document.getElementById("root"));
