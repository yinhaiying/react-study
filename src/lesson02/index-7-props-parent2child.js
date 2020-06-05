//  react状态：相当于vue中的data

import React from 'react';
import ReactDom from 'react-dom';
import "./style.css"

// 在父元素中使用state去控制子元素props，从而达到父元素数据传递给子元素。

class ParentCom extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isActive:true
    }
  }
  render(){
    return (
      <div>
        <button onClick = {this.changeShow.bind(this)}>显示</button>
        <ChildCom isActive = {this.state.isActive} />
      </div>
    )

  }
  changeShow(){
    this.setState({
      isActive:!this.state.isActive
    })
  }

}


class ChildCom extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let className = null;
    className = this.props.isActive ? 'active' :'';
    return (
      <div className = {'content ' + className}>
        子元素内容
      </div>
    )
  }
}
ReactDom.render(<ParentCom/>,document.getElementById('root'));
