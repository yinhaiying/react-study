//  react状态：相当于vue中的data
//
//
import React from 'react';
import ReactDom from 'react-dom';





class Content extends React.Component{
  // 类组件使用render方法进行渲染
  constructor(props){
    console.log('constructor');
    super(props);
    // 状态(数据) => 视图
    this.state = {
      time:new Date().toLocaleTimeString()
    }
  }
  render(){
    console.log('render');
    // 在render中修改数据
    this.state.time = new Date().toLocaleTimeString();
    return (
      <div>
        <h2>当前时间:{this.state.time}</h2>
      </div>
    )
  }

  // 生命周期函数,组件渲染完成
  componentDidMount(){
    // console.log(new Date().toLocaleTimeString());
    setInterval(() => {
      // console.log(new Date().toLocaleTimeString());
      // this.state.time = new Date().toLocaleTimeString();   无法触发更新
      this.setState({
        time:new Date().toLocaleTimeString()
      })
    },1000)
  }
}

// setInterval(() => {
//   ReactDom.render(<Content/>,document.getElementById('root'));
// },1000)
ReactDom.render(<Content/>,document.getElementById('root'));







// 多次渲染同一个组件时，组件不会多次初始化，也就是说constructor函数不会多次执行
// 但是render函数会多次执行。因此，我们修改状态都应该放到render函数中去。
