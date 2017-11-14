import React, {cloneElement} from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export default class BreadcrumbItem extends React.Component {

  // 应该指内部静态常量
  static __ANT_BREADCRUMB_ITEM = true;

  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
  };

  render() {
    const { prefixCls, separator, children, ...restProps } = this.props;
    let link;
    if ('href' in this.props) {
      link = <a className={`${prefixCls}-link`} {...restProps}>{children}</a>;
    } else {
      link = <span className={`${prefixCls}-link`} {...restProps}>{children}</span>;
    }
    if (children) {
      return (
        <span>
          {link}
          <span className={`${prefixCls}-separator`}>{separator}</span>
        </span>
      );
    }
    return null;
  }
}
