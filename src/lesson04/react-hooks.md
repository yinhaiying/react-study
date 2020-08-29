# react hooks 的简单实现

> 学习 react hooks 的使用，并且简单实现几种常见的 react hooks。

## useState 的简单实现

```javascript
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

function render() {
  index = 0; // 每次渲染时必须重置index，确保所有state的index每次都相同。
  ReactDom.render(<Counter />, document.getElementById("root"));
}
```

## useMemo 的简单实现

```javascript
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
```

## useCallback 的简单实现

```javascript
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
```

## useReducer

### useReducer 的使用

useReducer 接收一个形如(state,action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

```javascript
const reducer = (state, action) => {
  if (action.type === "add") {
    return state + 1;
  } else {
    return state;
  }
};
// {type：'add'}就是action是一个普通对象
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: "add" })}>add</button>
    </div>
  );
};
```

其实我们可以看到，useReducer 的使用与 useState 非常类似。其中 useReducer 接收两个参数，一个 reducer 和一个初始化值。
两者之间的差别是 state 状态的改变是直接通过 setState 进行改变，而 useReducer 改变
状态是通过 dispatch 一个 action，然后通过 reducer 函数来处理。

```javascript
const [state, setState] = useState(0); // useState的使用
const [state, dispatch] = useReducer(reducer, 0); // useReducer的使用
```

### useReducer 的简单实现

useReducer 的使用跟 useState 类似，两者的简单实现也是类似的。

```javascript
let lastState;

function useReducer(reducer, initialState) {
  lastState = lastState || initialState;

  function dispatch(action) {
    lastState = reducer(lastState, action);
    render();
  }
  return [lastState, dispatch];
}
```
