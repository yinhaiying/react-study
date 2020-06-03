// 组件如何管理自己内部的状态了。

import React from 'react';
import ReactDom from 'react-dom';





// 支持外界传递参数
const Header2 = function(props){
  return (
    <header>
        header:{props.name}
    </header>   
  )
}

// 组件管理自己的状态
const Button2 = function(){
    const [n,setN] = React.useState(0);
    return (
        <div>
            {n}
            <button onClick = {function(){setN(n+1)}}>
              加1
            </button>
        </div>
    )
}


// 为了区分组件与文本的区别，使用{}进行包裹。
const div = (
  <div>
      <p>
          <span>hello,react</span>
      </p>
      {/* {Header2({name:'react的入门'})}  使用方式一  */}
      {/* 使用方式二:使用元素的方式 */}
      <Header2 name = "react的入门222"></Header2>
      <Button2 />

  </div>
); 
ReactDom.render(div,document.getElementById('root'));


//  React的传参

//  {Header2({name:'react的入门'})}
//  <Header2 name = "react的入门222"></Header2>