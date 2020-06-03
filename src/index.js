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
        <div className = "cell" onClick = {props.onClickCell}>
            {props.text}
        </div>
    )
}

// const cellsMap = [
//     [null,null,null],
//     [null,null,null],
//     [null,null,null]
// ];

const Chessboard = function(){
    // 读取数据使用cellsMap,修改数据使用setCellsMap,useState中是初始值。
    const [cellsMap,setCellsMap] = React.useState([
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ]);
    const [n,setN] = React.useState(0);
    const tell = function(){
        console.log('tell');
    }
    // 改变CellsMap
    const onClickCell = (row,col) => {
       console.log('行:' + row);
       console.log('列：'+ col);
       //    如果我们没有改变数组的地址，那么直接set无法生效。
       let copy = JSON.parse(JSON.stringify(cellsMap));
       copy[row][col] = n % 2 == 0 ? 'X' : 'O';
       setCellsMap(copy);
       setN(n+1);
    //    判断胜负
       tell();
    }

    return (
        <div>
            <div>n:{n}</div>
            {/* 生成多个Cell组件 */}
            {
                cellsMap.map((items,row) => <div className = "row">
                    { items.map((item,col) => <div className = "cell">
                        <Cell text = {item} onClickCell = {() => onClickCell(row,col)} />
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