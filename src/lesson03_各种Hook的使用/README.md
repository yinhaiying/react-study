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


## useRef
我们在使用useState的时候，有没有注意到state的值可能同时存在，如下所示：
```js
function App() {
  console.log("App执行了")
  const [n, setN] = useState(0);
  const setLog = () => {
    setTimeout(() => {
      console.log("n:",n)  // 3秒后输出n
    },3000)
  }
  return (
    <>
      n的值为：{n}
      <button onClick={() => setN(n+1)}>add</button>
      <button onClick={setLog}>先点击Log</button>
    </>
  );
}
```
上面的代码中，我们先点击设置Log，它会在三秒后执行，输出n的值，然后我们点击add，实现n++，按理来说，此时应该会先让n增加变为1，然后输出1。但是，实际上我们会发现输出的是原来的n也就是0.这是因为，在react中state，每次修改时是创建一个新的state，也就是说如果存在异步，那么可能同时存在多个n，他们有不同的值。这是react的函数式思想决定的，函数式就是不让你去操作原来的变量，而是创建新的变量。但是，我们在开发中，经常可能需要一个值，能够使用同一个。那么应该如何做了？
1. 将变量写在组件外，使用window.n。但是这中方法不太好，可能导致变量重复。
2. 使用useRef:useRef不仅可以用于div，还能用于任意数据。useRef实际上就类似于一个window.xxx。只不过它内部使用{current:xxx}
```js
function App() {
  console.log("App执行了")
  const nRef = useRef(0)  // {current:0}
  const setLog = () => {
    setTimeout(() => {
      console.log("n:",nRef.current)
    },3000)
  }
  return (
    <>
      n的值为：{nRef.current}
      <button onClick={() => nRef.current+=1}>点击n</button>
      <button onClick={setLog}>点击Log</button>
    </>
  );
}
```
但是，这会带来一个问题，我们发现我们的nRef值变为5了，页面中还是展示0.也就是说useRef的值修改不会触发页面的render。那么就需要我们手动去触发render。react没有提供手动触发render，那么我们只能通过修改state来触发更新。
```js
function App() {
  console.log("App执行了")
  const nRef = useRef(0)  // {current:0}
  const [n,setN] = useState(null);  // 定义一个setN，用来触发更新。
  const setLog = () => {
    setTimeout(() => {
      console.log("n:",nRef.current)
    },3000)
  }
  return (
    <>
      n的值为：{nRef.current}
      <button onClick={() =>{ nRef.current += 1;setN(nRef.current)}}>点击n</button>  
      <button onClick={setLog}>点击Log</button>
    </>
  );
}
```
但是我们发现我们实际上不需要使用n，因此，我们只需要拿到setN即可，也就是定义一个update函数用来更新即可。
```js
function App() {
  const nRef = useRef(0)  // {current:0}
  const update = useState(null)[1];  // update函数用来跟新。
  const setLog = () => {
    setTimeout(() => {
      console.log("n:",nRef.current)
    },3000)
  }
  return (
    <>
      n的值为：{nRef.current}
      <button onClick={() =>{ nRef.current += 1;update(nRef.current)}}>点击n</button>
      <button onClick={setLog}>点击Log</button>
    </>
  );
}
```
3. 使用useContext。useContext也能够贯穿组件不变动。