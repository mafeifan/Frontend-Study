import React, { Component } from 'react'
import ReactDOM from 'react-dom'


function HOC(OldComponent, name) {
  class NewComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: null };
    }

    componentWillMount() {
      let data = "finley";
      this.setState({
        data
      });
    }

    render() {
      return <OldComponent data={this.state.data}/>;
    }
  }
  return NewComponent
}

class Demo extends React.Component {
  handleChange() {
    console.log(1)
  }
  render() {
    return (<input value={this.props.data} onChange={this.handleChange.bind(this)}/>)
  }
}


Demo = HOC(Demo, 'xx')
export default Demo
