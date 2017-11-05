import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Game   from '../Game/Game'
import ToDoList   from '../ToDoList'
import ReactChildren   from '../Demos/ReactChildren'
import NoMatch from './404'

export class RouterMap extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/todolist">ToDoList</Link></li>
            <li><Link to="/demos/ReactChildren">Demos</Link></li>
          </ul>
          <hr/>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/todolist" component={ToDoList} />
            <Route exact path="/demos/ReactChildren" component={ReactChildren} />
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
