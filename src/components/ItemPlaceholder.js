import React, { Component } from 'react';
import { injectSheet } from '../utils/jss';
import { observer } from 'mobx-react';
import classNames from 'classnames';

const itemPlaceholderStyles = {
  placeholder: {
    background: '#CEE5CB',
    borderRadius: '5px',
    border: '1px solid #67AC5B',
    flex: '1',
    minHeight: '250px',
    margin: '10px',
    padding: '15px',
    position: 'relative'
  }
};

@injectSheet(itemPlaceholderStyles)
@observer
class ItemPlaceholder extends Component {
  render() {
    const { order, item } = this.props.data;
    const { sheet:{ classes } } = this.props;
    const className = classNames({
      [classes.placeholder]: true
    });
    const style = {
      order: order,
      flexGrow: '1'
    };
    return (
      <div className={className} style={style}>
        {item ? <h4>{item.panel_title} (ID: {item.id})</h4> : ''}
      </div>
      );
  }
}

export default ItemPlaceholder;
