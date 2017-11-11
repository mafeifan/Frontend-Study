import React, { Component, cloneElement} from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export default class Input extends React.Component {

  static defaultProps = {
    prefixCls: 'ant-input',
    type: 'text',
    disabled: false,
  };

  getInputClassName() {
    const { prefixCls, size, disabled } = this.props;
    return classNames(prefixCls, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled,
    });
  }


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

  renderLabeledInput(children) {
    const props = this.props;

    if ((!props.addonBefore && !props.addonAfter)) {
      return children;
    }

    // 构造 addonBefore 和 addonAfter
    const wrapperClassName = `${props.prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBefore = props.addonBefore ? (
      <span className={addonClassName}>
        {props.addonBefore}
      </span>
    ) : null;

    const addonAfter = props.addonAfter ? (
      <span className={addonClassName}>
        {props.addonAfter}
      </span>
    ) : null;

    const className = classNames(`${props.prefixCls}-wrapper`, {
      [wrapperClassName]: (addonBefore || addonAfter),
    });

    if (addonBefore || addonAfter) {
      return (
        <span className={`${props.prefixCls}-group-wrapper`}>
          <span className={className}>
            {addonBefore}
            {cloneElement(children, { style: null })}
            {addonAfter}
          </span>
        </span>
      );
    }
  }

  renderInput() {
    const { value, className } = this.props;

    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
    ])

    return (
      <input {...otherProps}
             className={classNames(this.getInputClassName(), className)}
             type="text"
             onKeyDown={this.handleKeyDown}/>
    )
  }

  render() {
    return this.renderLabeledInput(this.renderInput())
  }
}
