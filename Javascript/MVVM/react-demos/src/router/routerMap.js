import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Game   from '../Game/Game'
import ToDoList   from '../ToDoList'
import ReactChildren from '../Demos/ReactChildren'
import ControlPanel from '../ControlPanel'
import NoMatch from './404'

// 总演示入口
import ANTD from '../ANTD/index'
// 各个组件的演示
import Input from '../ANTD/input/demo'
import Grid from '../ANTD/grid/demo'


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
          <hr style={{margin: '20px'}}/>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/todolist" component={ToDoList} />
            <Route exact path="/controlPanel" component={ControlPanel} />
            <Route exact path="/demos/ReactChildren" component={ReactChildren} />

            <Route exact path="/demos/ANTD" component={ANTD} />
            <Route exact path="/demos/Input" component={Input} />
            <Route exact path="/demos/Grid" component={Grid} />

            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    );
  }
}
