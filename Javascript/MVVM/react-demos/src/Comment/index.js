import React from 'react';
import PropTypes from 'prop-types';
import './comment.css';

export default class CommentApp extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

class CommentInput extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      username: '',
      content: ''
    };
  }

  componentDidMount() {
    this.textarea.focus();
  }

  _saveUsername(username) {
    localStorage.setItem('username', username);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({ username, content });
    }
    this.setState({ content: '' });
  }

  handleUsernameBlur(event) {
    this._saveUsername(event.target.value);
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              onBlur={this.handleUsernameBlur.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content}
              ref={a => (this.textarea = a)}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{this.props.comment.username} </span>：
        </div>
        <p dangerouslySetInnerHTML={{ __html: this.props.comment.content }} />
      </div>
    );
  }
}

class CommentList extends React.Component {
  static defaultProps = {
    comments: []
  };
  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    );
  }
}


