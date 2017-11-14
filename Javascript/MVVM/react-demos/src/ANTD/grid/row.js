import React, { Children, cloneElement} from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

// Row的gutter属性用来确定包含的每个col之间的间隙

export default class Row extends React.Component {
  static defaultProps = {
    // gutter是col之间的间隔
    // 通过<Row gutter={24}> => <div class="ant-row" style="margin-left: -8px; margin-right: -8px"></div>
    gutter: 0,
  };

  render() {
    const { type, justify, align, className, gutter, style, children,
      prefixCls = 'ant-row', ...others } = this.props;

    // 默认class只有一个ant-row
    // type一般是flex
    // 如果传入justify=center则ant-row-flex-center
    const classes = classNames({
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}-${justify}`]: type && justify,
      [`${prefixCls}-${type}-${align}`]: type && align,
    }, className);

    // 汇总style，如果gutter属性大于0，gutter最好满足(16+8n)px
    const rowStyle = gutter > 0 ? {
      marginLeft: gutter / -2,
      marginRight: gutter / -2,
      ...style
    } : style;

    const cols = Children.map(children, (col) => {
      if (!col) {
        return null;
      }
      if (col.props && gutter > 0) {
        return cloneElement(col, {
          style: {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2,
            ...col.props.style
          },
        });
      }
    })

    return(
      <div {...others} className={classes} style={rowStyle}>{cols}</div>
    )
  }
}
