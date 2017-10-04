import React from 'react';

class TypeNew extends React.Component {
  handleAdd = (e) => {
    e.preventDefault();
    const newInput = this._inputElement.value.trim();
    let items = this.props.items;
    if (newInput !== '') {
      items.push({
        text: newInput,
        done: false
      });
      this.props.onAdd(items);
    }
    this._inputElement.value = '';
    console.dir(this);
  }

  render() {
    return (
      <form onSubmit={this.handleAdd}>
        <input type="text" ref={(a) => this._inputElement = a} placeholder="search.." />
      </form>
    );
  }
}

class ToDoItems extends React.Component {
  handleDel = (e) => {
    const delIndex = e.target.getAttribute('data-key');
    this.props.items.splice(delIndex, 1);
    this.props.onDel(this.props.items);
  }
  render() {
    return (<ul>
      {this.props.items.map((item, i) =>
        <li key={item.text}>
          <label>{item.text}</label>
          <button onClick={this.handleDel} data-key={i}>delete</button>
        </li>
      )}
    </ul>);
  }
}


export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { text: 'learn AngularJS', done: true },
        { text: 'build an AngularJS app', done: false }
      ]
    };
    // 这行非常重要
    // https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(item) {
    this.setState({
      items: item
    })
    console.log(this);
  }

  render() {
    return (
      <div>
        <TypeNew onAdd={this.handleChange} items={this.state.items} />
        <ToDoItems onDel={this.handleChange} items={this.state.items} />
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
