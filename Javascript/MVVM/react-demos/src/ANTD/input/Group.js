import React from 'react';

export default class Group extends React.Component {

  render() {
    return (
      <span style={this.props.style}>
        {this.props.childRen}
      </span>
    )
  }
}
