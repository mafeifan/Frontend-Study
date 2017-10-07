import React from 'react';

class CommentForm extends React.Component {
  handleAdd = (e) => {
    e.preventDefault();
    const newInput = this._inputElement.value.trim();
    const newTextArea = this._textareaElement.value.trim();
    let items = this.props.items;
    if (newInput !== '' && newTextArea !== '') {
      items.push({
        name: newInput,
        content: newTextArea
      });
      this.props.onAdd(items);
    }
    this._textareaElement.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleAdd}>
        <div>
          <label>用户名</label>
          <input type="text" ref={(a) => this._inputElement = a} />
        </div>
        <div>
          <label>内容</label>
          <textarea ref={(a) => this._textareaElement = a} name="content" id="" cols="30" rows="10"></textarea>
        </div>
        <div><button>发布</button></div>
      </form>
    );
  }
}

class CommentList extends React.Component {
  render() {
    const items = this.props.items;
    return items.map((item, id) => <Comment item={item} key={id}></Comment>);
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div style={{ border: '1px solid black' }}>
        <span>{this.props.item.name}</span>
        <p>{this.props.item.content}</p>
      </div>
    );
  }
}

export default class CommentApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    // 这行非常重要
    // https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(item) {
    this.setState({
      items: item
    });
  }

  render() {
    return (
      <div>
        <CommentForm onAdd={this.handleChange} items={this.state.items}></CommentForm>
        <CommentList items={this.state.items}></CommentList>
      </div>
    );
  }
}

// export default function ToDoList(props) {
//   const lists = props.lists;
//   const listsItems = lists.map(item => <li key={item.text}>
//     <input type="checkbox" checked={item.done} />{item.text}</li>);
//   return (<ul>{listsItems}</ul>);
// }
