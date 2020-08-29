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
状态是通过 dispatch 一个 action，然后通过 reducer 函数来处理,实际上 useReducer 就是语法糖而已，真正的实现是通过 reducer 来改变的。

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

## useContext

useContext 接收一个`context`对象，并且返回该 context 的当前值。

### useContext 的简单使用

1. 创建一个 context 对象

```javascript
let AppContext = React.createContext();
// AppContext 中两个属性 Provider 和 Consumer
//  Provider是一个组件，是用来向子孙组件提供数据
// Consumer是用来获取Provider数据
```

2. AppContext.Provider 组件包裹子组件，用来传递数据

```javascript
const App = () => {
  let [state, setState] = useState(0);
  return (
    <AppContext.Provider value={{ state, setState }}>
      <Counter />
    </AppContext.Provider>
  );
};
```

3. 在子孙组件中通过 useContext 获取到数据

```javascript
const Counter = () => {
  let value = useContext(AppContext); // useContext得到传递下来的值
  return (
    <div>
      <p>{value.state}</p>
      <button
        onClick={() => {
          value.setState(value.state + 1);
        }}
      >
        add
      </button>
    </div>
  );
};
```

### useContext 的实现

useContext 实际上就是返回一个共享变量。

```javascript
function useContext(context) {
  return context._currentValue;
}
```
