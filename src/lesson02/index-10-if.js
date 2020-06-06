//  react事件

import React from 'react';
import ReactDom from 'react-dom';



function UserGreeting(props){
  return (
    <h1>欢迎登陆</h1>
  )
}

function UserLogin(props){
  return (
    <h1>请登录</h1>
  )
}

class Content extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLogin:true
    }
  }

  render(){
    if(this.state.isLogin){
      return (<UserGreeting />);
    }else{
      return (<UserLogin/>);
    }
  }
}


ReactDom.render(<Content/>,document.getElementById('root'));
