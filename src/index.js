//  列表渲染

import React from 'react';
import ReactDom from 'react-dom';


// 自动渲染数组中的内容
// class Content extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       list:['张三','李四','王五']
//     }
//   }
//   render(){
//     return (
//       <ul>
//         {this.state.list}
//       </ul>
//     )
//   }
// }

// 需要将数组内容改写成JSX类型的数组
// class Content extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       list:[
//         <li>张三</li>,
//         <li>李四</li>,
//         <li>王五</li>
//       ]
//     }
//   }
//   render(){
//     return (
//       <ul>
//         {this.state.list}
//       </ul>
//     )
//   }
// }


//  使用map来简化改写成JSX的过程，map会创建一个新的数组
// class Content extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       list:['张三','李四','王五']
//     }
//   }
//   render(){
//     return (
//       <ul>
//         {
//           this.state.list.map((item,index) => {
//             return <li key = {index}>姓名：{item}</li>
//           })
//         }
//       </ul>
//     )
//   }
// }

// 封装成组件

function ListItem(props){
  return (
    <li >姓名：{props.data}</li>
  )
}
class Content extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list:['张三','李四','王五']
    }
  }
  render(){
    return (
      <ul>
        {
          this.state.list.map((item,index) => {
            return <ListItem data = {item} key = {index}/>
          })
        }
      </ul>
    )
  }
}

ReactDom.render(<Content/>,document.getElementById('root'));
