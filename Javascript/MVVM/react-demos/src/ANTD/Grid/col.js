import React, {cloneElement} from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export default class Col extends React.Component {

  render() {
    const {span, prefixCls = 'ant-col', children, className} = this.props

    const classes = classNames({
      [`${prefixCls}-${span}`]: span,
    }, className);

    // 汇总style，如果gutter属性大于0，gutter最好满足(16+8n)px
    // const colStyle = span > 0 ? {
    //   marginLeft: gutter / -2,
    //   marginRight: gutter / -2,
    //   ...style
    // } : style;

    return(
      <div className={classes}>{children}</div>
    )
  }
}
