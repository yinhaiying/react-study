//  react状态：相当于vue中的data

import React from 'react';
import ReactDom from 'react-dom';
import "./style.css"

// 在父元素中使用state去控制子元素props，从而达到父元素数据传递给子元素。

class ParentCom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title:''
    }
  }
  render(){
    return (
      <div>
        <h1>子元素传递给父元素的数据：{this.state.title}</h1>
        <ChildCom setChildData  = {this.setChildData} />
      </div>
    )

  }
  setChildData = (data) => {
    this.setState({
      title:data
    })
  }

}


class ChildCom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      msg:'hello,react'
    }
  }
  render(){
    return (
      <div>
        <button onClick = {this.sendData.bind(this)}>点击子组件传值</button>
      </div>
    )
  }
  sendData(){
    this.props.setChildData(this.state.msg);
    this.setState({
      msg:'111'
    })
  }
}







ReactDom.render(<ParentCom/>,document.getElementById('root'));
