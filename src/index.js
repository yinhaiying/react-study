//  列表渲染

import React from 'react';
import ReactDom from 'react-dom';


class ComLife extends React.Component{
  constructor(props){
    console.log('构造函数执行')
    super(props);
    this.state = {
      msg:'hello,world'
    }
  }

  componentWillMount(){
    console.log('componentWillMount:将要挂载');
  }

  componentDidMount(){
    console.log('componentDidMount：组件渲染完毕');
  }

  componentWillReceiveProps(){
    console.log('componentWillReceiveProps:组件将要接收props参数');
  }
  componentWillUpdate(){
    console.log('componentWillUpdate:组件将要更新');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate:组件更新完毕');
  }
  componentWillUnmount(){
    console.log('componentWillUnmount:组件将要卸载');
  }
  render(){
    console.log('render渲染函数');
    return (
      <div>
        <h1>{this.state.msg}</h1>
        <button onClick = {this.onClickFn} >组件更新</button>
      </div>
    )
  }

  onClickFn = () => {
    this.setState({
      msg:'跟新后的数据'
    })
  }
}

ReactDom.render(<ComLife/>,document.getElementById('root'));
