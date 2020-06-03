import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// const Cell = function(){
//     const [text,setText] = React.useState('');
//     // 用变量来定义函数
//     const onClickButton = function(){
//         setText('X');
//     };
//     return (
//         // <div class = "cell">cell</div>   // 注意,我们这里是在写js，不是写HTML。在js中需要使用className代替class()
//         <div className = "cell" onClick = {onClickButton}>
//             {text}
//         </div>
//     )
// }
const Cell = function(props){

    return (
        // <div class = "cell">cell</div>   // 注意,我们这里是在写js，不是写HTML。在js中需要使用className代替class()
        <div className = "cell" >
            {props.text}
        </div>
    )
}

const cellsMap = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

const Chessboard = function(){
    return (
        <div>
            {
                cellsMap.map(items => <div className = "row">{
                    items.map(item => <div className = "cell">
                        <Cell text = {item} />
                    </div>)
                }</div>)
            }
        </div>
    )
}



ReactDOM.render(
    <Chessboard/>,
    document.getElementById('root')
);