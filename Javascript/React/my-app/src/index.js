import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './Game';
import ToDoList from './ToDoList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Game />, document.getElementById('game'));

const lists = [
  { text: 'learn AngularJS', done: true },
  { text: 'build an AngularJS app', done: false }
];
ReactDOM.render(<ToDoList lists={lists}></ToDoList>, document.getElementById('todolist'));
registerServiceWorker();
