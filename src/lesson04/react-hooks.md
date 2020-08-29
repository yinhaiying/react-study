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
