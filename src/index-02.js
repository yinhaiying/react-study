// 进一步支持组件，
import React from 'react';
import ReactDom from 'react-dom';


// react组件 使用纯JS的方法来定义组件
const Header = (
    <header>
        header
    </header>
);

const Button = (
    <button>
      点击
    </button>
);
// 为了区分组件与文本的区别，使用{}进行包裹。
const div = (
  <div>
      {Header}
      <p>
          <span>hello,react1</span>
      </p>
      {Button}
  </div>
); 
ReactDom.render(div,document.getElementById('root'));
