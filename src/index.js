import React from 'react';    // 当使用jsx语法的时候，React必须在作用域内。jsx语法用到React.createElement函数。
import ReactDOM from 'react-dom';
import App from './App'
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
