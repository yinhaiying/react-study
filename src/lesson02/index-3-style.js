// react中的style设置
import React from 'react';
import ReactDom from 'react-dom';
import './style.css';
// 样式设置

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
          <h2 className = {'item ' + className}>标题：{title}</h2>
          <img src = {'https://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2'} alt = "logo"/>
          {/* <div style = "height:200px">内容部分</div>  报错：style必须是一个对象 */}
          <div style = {{fontSize:'40px'}} >内容部分</div>
          {/* 只能写一个style，两个style。不会合并，而是被覆盖 */}
          <div style = {{fontSize:'40px'}} style = {style}>内容部分</div>
        </div>
    )
}

ReactDom.render(<Header/>,document.getElementById('root'));
