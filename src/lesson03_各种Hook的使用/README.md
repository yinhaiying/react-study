# 各种Hooks的简单使用





## useEffect



## useMemo

### React.memo 用于解决react多余的render
```js
function App() {
  const [n,setN] = useState(0);
  const [m,setM] = useState(0);
  const onClick = () => {
    setN(n+1)
  }
  return (
    <>
    n的值为：{n}
    <button onClick = {onClick}>点击</button>
    <Child data = {m}></Child>
    </>
  );
}

function Child(props){
  console.log("设置n的时候，Child执行了")
  return <div>child:{props.data}</div>
}
```
如上代码所示：在设置n的时候，整个APP都重新渲染了，但是实际上我们的Child组件，不依赖于n，实际上不需要进行渲染的。`React.memo`就是用来解决这种过度渲染的问题。
```js
function App() {
  const [n,setN] = useState(0);
  const [m,setM] = useState(0);
  const onClick = () => {
    setN(n+1)
  }
  return (
    <>
    n的值为：{n}
    <button onClick = {onClick}>点击</button>
    <Child2 data = {m}></Child2>  
    </>
  );
}

function Child(props){
  console.log("通过将Child包裹在React.memo中，不会再次执行")
  return <div>child:{props.data}</div>
}
const Child2 = React.memo(Child);
```
如上所示：我们将使用`React.memo(child)`,这样的话再次渲染`Child2`的时候，只有依赖的状态发生变化时，才会再次渲染。但是，上面的代码存在一个bug。那就是如果Child2的属性是引用类型，比如object或者Function，那么App重新渲染的时候，引用类型的属性也会重新渲染，而引用类型渲染前和渲染后不一样，Child2就回认为依赖的props发生变化了，这时候就会重新渲染Child2。
```js
function App() {
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  const onClick = () => {
    setN(n + 1);  // N改变
  };
  const onClick2 = () => {
    setM(m+1)
  }
  const onClickChild = () =>{}  // 重新渲染，引用类型。前后不一致
  return (
    <>
      n的值为：{n}
      <button onClick={onClick}>点击</button>
      <button onClick={onClick2}>修改M</button>
      <Child2 data={m} onClick={onClickChild} />   // 认为 onClick发生了改变
    </>
  );
}
function Child(props) {
  console.log("我又变了");  // 触发Child的重新渲染
  return <div onClick={props.onClick}>child:{props.data}</div>;
}
const Child2 = React.memo(Child);
```

### useMemo
因此，我们希望，如果是一个函数，我们希望也能够缓存它，再次渲染时，不要改变它的引用地址，而是一直是之前的地址。这就需要用到useMemo。useMemo用于缓存一个函数。
```js
function App() {
  console.log("App执行了")
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  const onClick = () => {
    setN(n + 1);
  };
  const onClick2 = () => {
    setM(m+1)
  }
  
  // const onClickChild = () =>{}
  // 使用useMemo缓存需要使用的函数
  const onClickChild =useMemo(() => {
    return () => {}; // 返回之前的函数
  },[m])
  return (
    <>
      n的值为：{n}
      <button onClick={onClick}>点击</button>
      <button onClick={onClick2}>修改M</button>
      <Child2 data={m} onClick={onClickChild} />
    </>
  );
}

function Child(props) {
  console.log("我又变了");
  return <div onClick={props.onClick}>child:{props.data}</div>;
}

const Child2 = React.memo(Child);

```
如上所示：我们的核心就是，使用useMemo来缓存函数，只有函数依赖的值发生变化时，才触发函数的更新。然后才会触发组件的更新。
```js
  const onClickChild =useMemo(() => {
    return () => {}; // 返回之前的函数
  },[m])
```
因此，`useMemo`通常和React.memo配合使用。

### useCallback
我们有没有发现，使用useMemo返回一个函数的写法很丑陋，我们需要在函数中嵌套函数。为了避免这种丑陋的写法，React提供了useCallback，它的功能跟useMemo完全一致，就是useMemo缓存函数的语法糖。
```js
 const onClickChild =useMemo(() => {
    return () => {}; // 返回之前的函数
  },[m])
  // 使用useCallback
  const onClickChild = useCallback(() => {},[m])
```