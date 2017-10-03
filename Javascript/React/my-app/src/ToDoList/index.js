import React from 'react';

// class ToDoList extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       lists: [
//         { text: 'learn AngularJS', done: true },
//         { text: 'build an AngularJS app', done: false }
//       ]
//     };
//   }
// }



export default function ToDoList(props) {
  const lists = props.lists;
  const listsItems = lists.map(item => <li key={item.text}>{item.text}</li>);
  return (<ul>{listsItems}</ul>);
}
