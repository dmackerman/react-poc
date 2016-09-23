import React from 'react';
import classNames from 'classnames';
import { map, mapValues } from 'lodash';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragLayer } from 'react-dnd';
import { observer } from "mobx-react";
import ItemPlaceholder from  './ItemPlaceholder';

const X_THRESHOLD = 150;

const dashboardContainerTarget = {
  canDrop(props, monitor) {
    const {item} = monitor.getItem();
    const {container} = props;
    return true;
    // return container.canDropItem(item);
  },

  hover(props, monitor, component) {
    let dropX, dropY;

    const { container } = props;

    // console.log(container.children.size);

    const { item, oldContainer } = monitor.getItem();

    const containerBoundingRect = findDOMNode(component).getBoundingClientRect();
    const containerChildren = container.children.values().map(child => {
        return { id: child.id, order: child.order };
    });

    // console.log(containerChildren)
    // console.log(childrenOrders);


    const containerMiddleX = Math.round(containerBoundingRect.width / 2);
    const containerMiddleY = (containerBoundingRect.bottom - containerBoundingRect.top) / 2;
    // console.log(containerMiddleY);

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



    // if (containerChildren.length % 2 === 0) {
        if (dropX === 'left') {
            // container.children.forEach((val, key, map) => {
            //     val.flex = 1;
            // });
            // container.showItemPlaceholder();
            return;
        }
  },

  drop(props, monitor, component) {
    const {container} = props;
    if (monitor.didDrop()) {
      return;
    }
    const { item, oldContainer } = monitor.getItem();

    if (container.existsInContainer(item)) {
        // reorder
        console.log('should reorder')
    }
    else {
        // move
        console.log('move')
        container.moveItem(item, oldContainer);
    }

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class DashboardContainer extends React.Component {
    render() {
        const {container, children} = this.props;

        // These this.props are injected by React DnD,
        // as defined by your `collect` function above:
        const {isOver, canDrop, connectDropTarget} = this.props;

        const containerClass = classNames({
          'container': true,
          [`flex-${container.flex}`]: container.flex,
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


export default DropTarget('dashboardItem', dashboardContainerTarget, collect)(observer(DashboardContainer));
