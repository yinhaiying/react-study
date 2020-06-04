
//  JSX表达式
import React from 'react';
import ReactDom from 'react-dom';




const div = (
    <div>
        <p>
            <span>hello,react1</span>
        </p>
    </div>
); 

// JSX作为表达式
let n = 3;
const element3 = (
  <div>
      <h1>JSX作为表达式</h1>
      <div>{ n > 0 ? <button>点击</button> : <button disabled>禁用</button>}</div>
  </div>
);
ReactDom.render(element3,document.getElementById('root'));
