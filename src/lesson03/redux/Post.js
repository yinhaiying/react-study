import React, { Component } from 'react';
import PostForm from './PostForm.js'
class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts :[]
        }
    }
    componentDidMount(){
        fetch("http://jsonplaceholder.typicode.com/posts")
          .then((response) => response.json())
          .then((json) => this.setState({
              posts:json
          }));
    }
    render() {
        const postItems = this.state.posts.map((post) => {
            return (
                <div key = {post.id}>
                  <h3>{post.title}</h3>
                  <h3>{post.body}</h3>
                </div>
            )

        })
        return (
          <div>
            <h1>posts</h1>
            <PostForm/>
            {postItems}
          </div>
        );
    }
}

export default Posts;
