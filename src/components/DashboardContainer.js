import React from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { observer } from "mobx-react";

const dashboardContainerTarget = {
  canDrop(props, monitor) {
    const {item} = monitor.getItem();
    const {container} = props;
    return container.canDropItem(item);
  },

  hover(props, monitor, component) {},

  drop(props, monitor, component) {
    const {container} = props;
    if (monitor.didDrop()) {
      return;
    }
    const {item, oldContainer} = monitor.getItem();
    container.moveItem(item, oldContainer);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

const DashboardContainer = (props) => {
  const {container, children} = props;

  // These props are injected by React DnD,
  // as defined by your `collect` function above:
  const {isOver, canDrop, connectDropTarget} = props;

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
    </div>
  )
}

export default DropTarget('dashboardItem', dashboardContainerTarget, collect)(observer(DashboardContainer));
