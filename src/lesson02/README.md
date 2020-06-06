# JSX的使用

## 普通HTML标签和组件

1. 由HTML元素构成，
2. 中间如果需要插入变量，使用{}包裹起来。
3. {}中间可以使用表达式
4. 表达式可以使用JSX对象
5. 属性和HTML一样都是使用{}插入内容。

## JSX表达式
```javascript
{ 1 + 1}                 // 普通表达式
{n > 0 ? 'hahha':''};    // 三元运算符
{n > 0} ? <button>
```

## class 样式设置
1. class必须使用className，因此class在js中是定义类的关键词。

```javascript
const Header = function(){
    const title = "React的学习";
    const className = "bg-color";
    return (
        <div>
          <h2 className = {className}>标题：{title}</h2>
          <img src = {'https://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2'} alt = "logo"/>
          <div>内容部分</div>
        </div>
    )
}
```
2. 多个className不会被合并，而是被覆盖。因此，如果我们想要实现多个className， 必须把原来的clasName添加进来了。
```javascript
const Header = function(){
    const title = "React的学习";
    const className = "bg-color";
    return (
        <div>
          <h2 className = {'item ' + className}>标题：{title}</h2>
          <img src = {'https://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2'} alt = "logo"/>
          <div>内容部分</div>
        </div>
    )
}
```
或者提前将数组拆分好
```javascript
const subTitleClass = ['subTitle','item'].join(' ');
```




## style设置

```javascript
1. style必须是一个对象
2. style只能写一个，多个style的属性不会合并，而是被后面的覆盖。
const Header = function(){
    const title = "React的学习";
    const className = "bg-color";
    const style = {
      color:'red',
      width:'100px',
      height:'100px',
      border:'1px solid green',
      backgroundColor:'rgba(0,0,0,.5)'
    }
    return (
        <div>
          <h2 className = {className}>标题：{title}</h2>
          <img src = {'https://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2'} alt = "logo"/>
          {/* <div style = "height:200px">内容部分</div>  报错：style必须是一个对象 */}
          <div style = {{fontSize:'40px'}} >内容部分</div>
          {/* 只能写一个style，两个style。不会合并，而是被覆盖 */}
          <div style = {{fontSize:'40px'}} style = {style}>内容部分</div>
        </div>
    )
}

```

## 注释
在react中不能直接使用// 进行注释，因为在js中会被直接当成文本。react中由于是js写任何代码都会被当成文本来处理。
因此，我们的注释只能写在JSX表达式中。也就是必须写在{}中。






## state状态管理
1. 在constructor构造函数中，初始化state,将需要操作的数据放到state对象中
2. 通过setState修改数据，切勿直接修改数据。
3. 通过setState修改完数据后，并不会立即修改DOM里面的内容，react会在这个组件所有状态设置完成后，统一对比虚拟DOM
对象，然后再统一修改，提升性能。（这就是使用setState的原因)


## 父传子数据传递
1. props:父组件传递值给子组件，单向流动，子组件不能修改父组件的值.
2. 父组件可以通过传递state给子组件，然后修改state的值，从而实现修改子元素。
3. props的传值可以是任意的类型。props可以传递函数，props可以传递父元素的函数，就可以去修改父元素的state，从而达到
传递数据给父元素。


## 子传父数据传递
调用父元素的函数从而操作父元素的数据，从而实现数据从子组件传递至父组件。
1. 实际上还是父元素的函数中调用setState进行修改。只不过放到子元素中来执行了。


## react事件
1. 绑定事件的命名是驼峰命名法(由于JSX是JS，在js中事件就是驼峰命名)。
2. 传入的是一个函数，而不是一个字符串名字。需要写在{}中。
```javascript
<button onClick = {this.onClick('123')}></button>  // 这传入的就是一个函数执行的结果。不是一个函数
<button onClick = {(e) => {this.onClick('123',e)}}></button>  // 绑定的是箭头函数

```
3. 事件对象：react返回的事件对象是代理的原生事件对象，如果想要查看某个值，必须确切地打印它才能看到。
4. 默认事件：原生阻止默认行为时，可以通过返回false，但是在react中必须使用e.preventDefault()。
5. 参数的传递：
由于react绑定的必须是一个函数，因此我们不能直接对函数传参(这样就直接执行了)，我们必须使用一个箭头函数包裹起来。这样
绑定的就是一个函数了。
```javascript
<button onClick = {(e) => {this.onClick('123',e)}}></button>
```


## 条件渲染
React中的条件渲染，即和javascript中的条件运算符,如if...else，三元运算符等的使用相同。
直接通过条件运算返回要渲染的JSX对象


## 列表渲染
由于React不是一种模板语言，因此它不像vue一样提供v-for这种遍历的方法，如果我们想要进行列表渲染，
只能手动地将一个数组添加到JSX中。
1. 会直接将一个数组解构出来进行渲染，但是不会自动添加HTML元素。你数组中是什么就渲染成什么
```javascript

class Content extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list:['张三','李四','王五']
    }
  }
  render(){
    return (
      <ul>
        {this.state.list}    // 直接渲染成张三，李四，王五
      </ul>
    )
  }
}
```
2. 如果我们想要将内容生成列表，我们就需要将内容转变成JSX数组。
```javascript
class Content extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list:[
        <li>张三</li>,
        <li>李四</li>,
        <li>王五</li>
      ]
    }
  }
  render(){
    return (
      <ul>
        {this.state.list}
      </ul>
    )
  }
}
```
3. 使用map来简化生成JSX列表的过程。我们都知道map会对数组每一项进行操作，然后返回新的数组。
```javascript
class Content extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list:['张三','李四','王五']
    }
  }
  render(){
    return (
      <ul>
        {
          this.state.list.map((item,index) => {
            return <li key = {index}>姓名：{item}</li>
          })
        }
      </ul>
    )
  }
}
```
