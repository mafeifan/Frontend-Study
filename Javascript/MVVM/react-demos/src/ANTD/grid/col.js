import React, {cloneElement} from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export default class Col extends React.Component {

  render() {
    const props = this.props;

    const { span, order, offset, push, pull, className, children, prefixCls = 'ant-col', ...others } = props;

    let sizeClassObj = {};

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      let sizeProps = {};
      if (typeof props[size] === 'number') {
        sizeProps.span = props[size];
      } else if (typeof props[size] === 'object') {
        sizeProps = props[size] || {};
      }

      delete others[size];

      sizeClassObj = {
        ...sizeClassObj,
        [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      };
    });

    // 汇总style，如果gutter属性大于0，gutter最好满足(16+8n)px
    // const colStyle = span > 0 ? {
    //   marginLeft: gutter / -2,
    //   marginRight: gutter / -2,
    //   ...style
    // } : style;

    const classes = classNames({
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    }, className, sizeClassObj);

    return(
      <div className={classes}>{children}</div>
    )
  }
}
