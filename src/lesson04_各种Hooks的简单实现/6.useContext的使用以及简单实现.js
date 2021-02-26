import React, { useState, useContext } from "react";
import ReactDom from "react-dom";

let AppContext = React.createContext();
// AppContext 中两个属性 Provider 和 Consumer
//  Provider是用来向子孙组件提供数据
// Consumer是用来获取Provider数据
const Counter = () => {
  let value = useContext(AppContext);
  return (
    <div>
      <p>{value.state}</p>
      <button
        onClick={() => {
          value.setState(value.state + 1);
        }}
      >
        add
      </button>
    </div>
  );
};

const App = () => {
  let [state, setState] = useState(0);
  return (
    <AppContext.Provider value={{ state, setState }}>
      <Counter />
    </AppContext.Provider>
  );
};

function render() {
  ReactDom.render(<App />, document.getElementById("root"));
}

render();
