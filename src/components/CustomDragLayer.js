import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import shallowCompare from 'react-addons-shallow-compare';

const layerStyles = {
  pointerEvents: 'none',
  flex: 1,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const {currentOffset} = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  // const {x, y} = currentOffset;
  // const transform = `translate(${x}px, ${y}px)`;
  // return {
  //   transform: transform,
  //   WebkitTransform: transform
  // };
}

@DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
}))
export default class CustomDragLayer extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    renderItem(type, item) {
      const style = {
        background: 'red',
        height: '100px',
        width: '200px'
      };
      return (
        <div style={style}></div>
        );
    }

    render() {
      const {item, itemType, isDragging, currentOffset} = this.props;
      console.log(currentOffset);
      if (!isDragging) {
        return null;
      }

      return (
        <div style={layerStyles}>
            <div style={getItemStyles(this.props)}>
              {this.renderItem(itemType, item)}
            </div>
      </div>
        );
    }
  }
