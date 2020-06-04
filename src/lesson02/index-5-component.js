//  组件
import React from 'react';
import ReactDom from 'react-dom';



// 函数式组件
function Header(props){
  console.log('函数式组件');
  console.log(props);
  return (
    <div>
      <h2>标题：{props.title}</h2>
    </div>
  )
}

// // 类组件
class Content extends React.Component{
  // 类组件使用render方法进行渲染

  render(){
    console.log('类组件');
    console.log(this);
    return (
      <div>
        <h2>title:类组件</h2>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

const App = function(){
  return (
    <div>
    <Header title = {'函数式组件传值'}/>
    <Content content = {'类组件传值'} />
    </div>

  )
}

ReactDom.render(<App/>,document.getElementById('root'));
