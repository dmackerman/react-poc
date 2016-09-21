import React from 'react';
// import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';

const dashboardContainerTarget = {
  canDrop(props, monitor) {
    return true;
  },

  hover(props, monitor, component) {
    //   console.log(monitor);
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    // const clientOffset = monitor.getClientOffset();
    // const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    // console.log('isJustOverThisOne?', isJustOverThisOne)

    // You will receive hover() even for items for which canDrop() is false
    // const canDrop = monitor.canDrop();
    const dragId = monitor.getItem().id;
    const hoverId = props.id;

    // Determine rectangle on screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //
    // // Determine mouse position
    // const clientOffset = monitor.getClientOffset();
    //
    // // Get pixels to the top
    // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // console.log(hoverBoundingRect);

    // console.log(dragId, hoverId);
  },

  drop(props, monitor, component) {
      if (monitor.didDrop()) {
          return;
      }
      const item = monitor.getItem();
    //   console.log(props);
    //   console.log(item);

      props.moveItem(item, props)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

const DashboardContainer = (props) => {
    const { layout, children, flex, toggleContainerLayout, toggleContainerFlex } = props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = props;

    const containerClass = classNames({
        'container': true,
        [`flex-${flex}`]: flex,
        'column': layout === 'column'
    });

    return connectDropTarget(
        <div className={containerClass}>
            <button className="container-toggle" onClick={toggleContainerLayout}>Toggle Layout</button>
            <div className="controls">
                <button onClick={toggleContainerFlex}>Increase Flex</button>
            </div>
            {children}
        </div>
    )
}

export default DropTarget('dashboardItem', dashboardContainerTarget, collect)(DashboardContainer);
