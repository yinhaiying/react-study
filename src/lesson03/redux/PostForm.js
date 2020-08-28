import React, { Component } from "react";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
  }
  onChange = (e) => {
      this.setState({
          [e.target.name]:e.target.value
      })
  }
  onSubmit = (e) => {
      e.preventDefault();
      const post = {
          title:this.state.title,
          body:this.state.body
      }
      fetch("http://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(post),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(111);
          console.log(data);
        });
  }
  render() {
    return (
      <div>
        <h1>添加内容</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>title</label>
            <br />
            <input type="text" name="title" value={this.state.title} onChange={this.onChange}/>
          </div>
          <div>
            <label>body</label>
            <br />
            <textarea name="body" value={this.state.body} onChange={this.onChange}/>
          </div>
          <button type="submit">添加</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
