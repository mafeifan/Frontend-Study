import React from 'react';

export default class Input extends React.Component {

  handleKeyDown = (e) => {
    console.log(e)
    // 该组件上面可接收这两个事件
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      console.log('-- enter')
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  render() {
    return (
      <input {...this.props} type="text" onKeyDown={this.handleKeyDown}/>
    )
  }
}
