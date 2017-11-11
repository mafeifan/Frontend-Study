import React from 'react';
import input from './Input'

export default class Search extends React.Component {

  onSearch() {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.refs.input.value);
    }
    this.input.focus();
  }

  render() {
    return (
      <input type="text" onPressEnter={this.onSearch.bind(this)}/>
    )
  }
}
