import React, { Children, cloneElement} from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import classNames from 'classnames';
import omit from 'omit.js';


export default class Breadcrumb extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
  };

  render() {
    const { separator, prefixCls, style, className, routes, params = {}, children } = this.props;

    let crumbs;

    if (children) {
      crumbs = Children.map(children, (element, index) => {
        if (!element) {
          return element;
        }

        if (element.type && element.type.__ANT_BREADCRUMB_ITEM) {
          console.warn('Breadcrumb only accepts Breadcrumb.Item as it\'s children');
        }

        return cloneElement(element, {
          separator,
          key: index,
        });
      })
    }

    return(
      <div className={classNames(className, prefixCls)} style={style}>{crumbs}</div>
    )
  }
}
