import React from 'react';
import ReactDom from 'react-dom';
import './style.css';
// 样式设置

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

ReactDom.render(<Header/>,document.getElementById('root'));
