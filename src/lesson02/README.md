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
