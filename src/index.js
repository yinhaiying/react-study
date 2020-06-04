//  react状态：相当于vue中的data

import React from 'react';
import ReactDom from 'react-dom';
import "./style.css"
class Tab extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      c1:'content active',
      c2:'content'
    }
  }
  clickHandle(e){
    let index = e.target.dataset.index;
    // console.log(this);   this是undefined
    console.log(this);   // this是undefined
    if(index === "1"){
      this.setState({
        c1:'content active',
        c2:'content'
      })
    }else{
      this.setState({
        c1:'content',
        c2:'content  active'
      })
    }

  }
  render(){
    return (
      <div>
        {/* <button data-index = "1" onClick = {this.clickHandle}>内容一</button>
        <button data-index = "2" onClick = {this.clickHandle}>内容二</button> */}
     <button data-index = "1" onClick = {this.clickHandle.bind(this)}>内容一</button>
        <button data-index = "2" onClick = {this.clickHandle.bind(this)}>内容二</button>
        <div className = {this.state.c1}>内容一</div>
        <div className = {this.state.c2}>内容二</div>
      </div>
    )
  }
}





ReactDom.render(<Tab/>,document.getElementById('root'));
