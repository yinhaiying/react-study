
import React from 'react';
import ReactDom from 'react-dom';

// 原生JS实现
// const oDiv = document.createElement('div');
// const oP = document.createElement('p');
// const oSpan = document.createElement('span');
// oSpan.innerText = "Hello,React";
// oP.appendChild(oSpan);
// oDiv.appendChild(oP);
// document.body.appendChild(oDiv);



// 通过函数封装
// const oDiv = createElement('div',
//                 createElement('p',
//                   createElement('span','hello,react')));   // 创建一个div，他的子元素是p元素,p元素的子元素是span元素。
// document.body.appendChild(oDiv);

// createElement可以将创建元素变得非常简单
// function createElement(tagName,children){
//   let element = document.createElement(tagName);
//   if(children){
//     // 判断是不是文本 appendChild不支持直接添加文本
//     if(typeof children === 'string'){
//         const childElement = document.createTextNode(children);
//         element.appendChild(childElement);
//     }else{
//         element.appendChild(children);
//     }
//   }
//   return element;
// }



// 进一步修改
// const oDiv = (
//   t('div',
//     t('p',
//       t('span','hello,react')))
// ); 

// 我们发现这种缩进跟HTML中标签的结构一模一样。
/* 
<div>
  <p>
    <span>hello,react</span>  
  </p>
</div> 
*/


// const div = (
//   <div>
//     <p>
//       <span>hello,react</span>  
//     </p>
//   </div> 
// );

// 因此，我们希望创建一种语法，用户写下面这种代码，实际上实现功能和上面通过t函数实现一样。
//  这就是React的主要原理。你觉得你在写标签，实际上，你写的是createElement这些js方法。



// 接下来我们就用React来实现我们上面的功能。



const div = (
  React.createElement('div',null,
    React.createElement('p',null,
      React.createElement('span',null,'hello,react')))
); 

console.log(div);   // object 我们可以发现这是一个对象 实际上就是一个虚拟的DOM，他不是一个元素

// document.body.appendChild(div);   //  由于它是虚拟DOM，因此我们无法直接将其添加到body上。
// 如果我们想要将其渲染到页面上，这时候就需要react-dom

ReactDom.render(div,document.getElementById('root'));


// 总结：
//  React提供了createElement方法，创建虚拟DOM
//  ReactDOM提供了render方法，将虚拟DOM渲染到页面