# React Hooks 详解之 useState

## 前言

> 关于 react hooks 的优点，这里就不详细阐述了，大家可以去查看[文档](https://zh-hans.reactjs.org/docs/hooks-intro.html#motivation)。
> 本文的主要重点是详细解释各种 hooks 的使用以及阐述一些简单的 hooks 实现来帮助我们理解 hooks。其中第一个 hooks 也是使用频率最高最重要的 Hooks 就是`useState`。

## useState

### useState 的使用

Hooks 的最大的作用就是可以让你在不编写`class`的情况下使用`state`以及其他的 React 特性。而 useState 的功能就是让你在函数式组件中使用 state。
我们看下具体使用：

```javascript
import React, { useState } from "react";
import ReactDom from "react-dom";

function Counter() {
  let [count, setCount] = useState(0); // 定义state:count
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

function render() {
  ReactDom.render(<Counter />, document.getElementById("root"));
}

render();
```

在上面的代码中，`Counter`组件是一个函数式组件，通过 useState 传入一个初始值，然后返回了 `count` 和 `setCount`。`count` 在组件每次被调用时都会发生变化，`setCount` 用于修改 `count` 的值，每次修改后都会触发 Count 组件的重新渲染。从上面的分析中，我们可以看到 useState 主要具有以下功能：

1. 接受一个参数作为初始化值
2. 返回一个数组，数组的第一个值为最新的状态 count，第二个值为一个函数用于修改状态 setCount
3. setCount 设置后需要触发重新渲染

### useState 的初步实现

根据上面分析的 useState 的功能，我们初步实现一个简单的 useState。

```javascript
let state;
function useState(initialState) {
  state = state || initialState;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}
```

实现思路如下：

- **外部声明一个 state，用来接收初始值和更新后的值**。为什么要定义在 useState 函数外面？是因为如果定义在函数里面，每次重新渲染时，都会将这个值设置为初始值，那样的话就拿不到最新的值了。
- **内部定义一个函数，函数用来更新 state,并触发重新渲染**。函数会接收一个 newState，并将其赋值给外部的 state，然后调用 render 函数，实现组件的重新渲染。
- **返回一个数组**。数组中是最新的 state 以及更新 state 的方法。

我们将自己实现的 useState 替换 react 的 useState，观察功能的实现。

```javascript
import React from "react";
import ReactDom from "react-dom";

// 自定义的useState
let state;
function useState(initialState) {
  state = state || initialState;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}

// Counter组件
function Counter() {
  let [count, setCount] = useState(0);
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

function render() {
  ReactDom.render(<Counter />, document.getElementById("root"));
}
render();
```

上面的代码能够正常实现原来的 useState 的一些功能，但是这存在一些问题，那就是如果有多个 useState 怎么办？如果保存多个 state?我们看如下代码？

```javascript
function Counter() {
  let [count, setCount] = useState(0);
  let [num, setNum] = useState(0); // 共用一个state保存状态，修改第二个会导致第一个被覆盖。
  return (
    <>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>+</button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

由于我们所有的数据都共用同一个 state，因此修改其中一个会导致另外的被覆盖。为了解决这个问题，我们必须给每一个数据提供一个变量用来保存状态，从而避免冲突。解决办法是使用一个数组来进行保存。

```javascript
let state = []; // state数组用来保存数据
let index = 0; // index用来对应每一个数组项
function useState(initialState) {
  let currentIndex = index; // currentIndex用来保存当前index
  state[currentIndex] = state[currentIndex] || initialState;
  function setState(newState) {
    state[currentIndex] = newState;
    render();
  }
  index += 1; // 每次修改完成之后index加1
  return [state[currentIndex], setState];
}

function render() {
  index = 0; // render时需要重新恢复index
  ReactDom.render(<Counter />, document.getElementById("root"));
}
```

实现思路如下：

- 将`state`声明成数组，每一个数据对应数组的某一项
- 声明一个索引`index`,每个数据对应一个索引值
- `setState`通过操作索引去设置值
- 每调用一次`useState`需要将 index+=1。这样的话确保多个数据具有不同的索引值
- 返回的值也是通过索引获取
- 每次 `render` 重新渲染时需要将索引 index 置为 0，确保每个数据对应的索引每次都是一致的（render 渲染组件重新渲染，组件内所有的 useState 会执行一次，每个数据又会分配一个索引，因此每次需要将 index 置为 0，确保每次的索引一致。这也是为什么 hooks 不能写在 if,while 等条件判断中）。

上面最核心的一点就是确保每个 useState 的数据对应的 index 必须一致。
也就是说：

- 第一次渲染时，count 对应的索引值为 0，num 对应的索引值为 1。
- 第二次渲染时，count 对应的索引值仍然为 0，num 对应的索引值为 1。
- 第三次渲染时，count 对应的索引值仍然为 0，num 对应的索引值为 1。
- ...

**为什么需要保证 useState 的数据索引一致**<br/>
我们定义多个数据，使用多次 useState，观察每次数据的索引值：

```javascript
import React from "react";
import ReactDom from "react-dom";

let state = [];
let index = 0;
function useState(initialState) {
  console.log("index", index); // 观察
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
  let [count, setCount] = useState(0); // 第一个useState的索引index
  let [num, setNum] = useState(0); // 第二个useState的索引index
  let [count1, setCount1] = useState(0); // 第三个useState的索引index
  let [num1, setNum1] = useState(0); // 第四个useState的索引index
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
```

我们查看最终的打印顺序为：

```javascript
index 0
index 1
index 2
index 3
```

也就是说无论什么情况下：这四个数据对应的索引始终分别为：0、1、2 和 3。
不允许出现下面这种情况。

```javascript
function Counter() {
  let [count, setCount] = useState(0);
  // 在条件语句中定义useState
  if (count % 2 == 0) {
    let [count1, setCount1] = useState(0);
  }
  if (num % 2 == 0) {
    let [num1, setNum1] = useState(0);
  }
  let [num, setNum] = useState(0);

  return (
    <>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>+</button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

如果我们在条件语句中定义了 useState，这样的话会导致可能第一次只有两个 useState，对应的 count 和 num 的索引为 0 和 1。但是下一次满足条件，有了四个 useState 了，对应的 count 和 num 的索引就变成 0 和 3 了。这样的话 num 的索引值发生了变化，它在不同情况下从数组中取得的值就是不一样了，不是它自身的值，这样就会导致错误。因此，uesState 如果定义在条件语句中就会出现如下报错：

```javascript
React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render
```

## 总结

到目前为止，我们介绍了

- useState 的使用
- useState 的初步实现
- useState 实现过程中面临的问题，以及解决办法<br/>

通过上面的介绍，可以加深我们对 useState 的理解，当然这不是官方的实现方式，只是简化后便于理解的方式。目的只是为了帮助我们更好地使用 useState。
