//  react事件

import React from 'react';
import ReactDom from 'react-dom';


class ParentCom extends React.Component{
    constructor(props){
        super(props)
    }
    parentEvent = (e,msg) => {
        //  rea
      console.log(e);
      console.log(msg);
      e.preventDefault();
    }
    render(){
        return (
            <div onClick = {(e) => {this.parentEvent(e,'123')}}>
                <div className = "child">
                    <h2>hello,parent component</h2>
                </div>
            </div>
        )
    }
}






ReactDom.render(<ParentCom/>,document.getElementById('root'));
