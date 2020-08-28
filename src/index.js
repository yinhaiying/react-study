

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Post from "./lesson03/redux/Post.js";
class Index extends Component {
  render() {
    return (
      <div>
        <Post/>
      </div>
    );
  }
}




ReactDom.render(<Index />, document.getElementById("root"));
