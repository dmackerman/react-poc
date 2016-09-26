import React from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { observer } from "mobx-react";
import ItemPlaceholder from  './ItemPlaceholder';

const X_THRESHOLD = 150;

const dashboardContainerTarget = {
  canDrop(props, monitor) {
    // const {item} = monitor.getItem();
    // const {container} = props;
    return true;
    // return container.canDropItem(item);
  },

  hover(props, monitor, component) {
    let dropX, dropY;

    const { container } = props;

    const containerBoundingRect = findDOMNode(component).getBoundingClientRect();
    const containerMiddleX = Math.round(containerBoundingRect.width / 2);
    const containerMiddleY = (containerBoundingRect.bottom - containerBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    if ( (clientOffset.y >= containerMiddleY )) {
        dropY = 'bottom'
    }
    else {
        dropY = 'top'
    }

    // in the middle
    if ( (clientOffset.x >= containerMiddleX - X_THRESHOLD ) && ( clientOffset.x <= containerMiddleX + X_THRESHOLD ) ) {
        dropX = 'middle'
    }

    // left side?
    if (clientOffset.x <= ( containerMiddleX - X_THRESHOLD )) {
        dropX = 'left'
    }

    // right
    if ( clientOffset.x > ( containerMiddleX + X_THRESHOLD )) {
        dropX = 'right'
    }

  },

  drop(props, monitor, component) {
    const { container } = props;
    const { item, oldContainer } = monitor.getItem();

    console.log(monitor.getItem());

    if (monitor.didDrop()) {
      return;
    }

    if (container.existsInContainer(item)) {
        // reorder
        console.log('should reorder')
        container.moveItem(item);
    }
    else {
        // move
        console.log('move')
        container.moveItem(item, oldContainer);
    }

  }
};

@DropTarget('dashboardItem', dashboardContainerTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))
@observer class DashboardContainer extends React.Component {
    render() {
        const { container, children } = this.props;
        const { isOver, canDrop, connectDropTarget } = this.props;

        const containerClass = classNames({
          'container': true,
          [`height-${container.height}`]: true,
          [`width-${container.width}`]: true,
          'column': container.layout === 'column',
          'droppable': canDrop,
          'over': isOver
        });

        const containerStyles = {
          order: container.order
        };

        return connectDropTarget(
          <div className={containerClass} style={containerStyles}>
              <button className="container-toggle" onClick={() => container.toggleLayout()}>
                  Toggle Layout
              </button>
              {children}
              { isOver ? <ItemPlaceholder data={container.placeholder} /> : '' }
          </div>
        )
    }
}


export default DashboardContainer;
