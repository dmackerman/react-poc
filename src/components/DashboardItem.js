import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';
import { observer } from "mobx-react";

import { LoadingIndicator } from './';
import { DashboardItemControls } from './';

const dashboardItemSource = {
    beginDrag(props) {
        return {
            item: props.item,
            oldContainer: props.container
        }
    }
};

const cardTarget = {
    canDrop(props, monitor) {
        const { item } = monitor.getItem();
        return true;
        //   return container.canDropItem(item);
    },
    hover(props, monitor, component) {
        const { container, item } = monitor.getItem();

        // our hovering targets
        const hoveredItem = props.item;
        const hoveredContainer = props.container;

        const dragId = item.id;
        const hoverId = hoveredItem.id;

        // if we're over the same item, just exit
        if (dragId === hoverId) {
            return;
        }

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // bounds for the item were hovering over, and the middle point
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleX = Math.round(hoverBoundingRect.width / 2);

        if (clientOffset.x - hoverBoundingRect.left > hoverMiddleX) {
            hoveredContainer.showItemPlaceholder(hoveredItem.order + 1)
            return;
        }

        if (clientOffset.x - hoverBoundingRect.left < hoverMiddleX) {
            hoveredContainer.showItemPlaceholder(hoveredItem.order - 1)
            return;
        }

        // console.log(monitor.isOver())
        //
        // console.log(monitor.getItem())

        // // Get vertical middle

        //

        //
        // // Get pixels to the top
        // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // // Dragging downwards
        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //   return;
        // }
        //
        // // Dragging upwards
        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //   return;
        // }
    },

    /*TODO Handle ordering */
  drop(props, monitor, component) {
    //   const { container, item } = monitor.getItem();
  }
};


@DropTarget('dashboardItem', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
}))
@DragSource('dashboardItem', dashboardItemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))
@observer class DashboardItem extends Component {
    render() {
        const { container } = this.props;
        const { flex, panel_title, id, loading, added, removed, order, isPlaceholder} = this.props.item;
        const { isDragging, connectDragSource, connectDragPreview, connectDropTarget, isOver } = this.props;
        const dashboardItemClass = classNames({
            'box': true,
            'new-item': added,
            'removed': removed,
            'loading': loading,
            'dragging': isDragging,
            [`flex-${flex}`]: true,
            'placeholder': isPlaceholder
            // 'over': isOver
        });


        const isLoading = loading ? <LoadingIndicator /> : '';
        const itemOrder = { 'order': order };

        return connectDragPreview(
            connectDropTarget(<div className={dashboardItemClass} style={itemOrder}>
                { isLoading }
                {connectDragSource(
                    <div className="drag-handle">
                        <img alt="drag" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cG9seWdvbiBwb2ludHM9IjQ4MCwyNTYgMzg0LDE2MCAzODQsMjM2IDI3NiwyMzYgMjc2LDEyOCAzNTIsMTI4IDI1NiwzMiAxNjAsMTI4IDIzNiwxMjggMjM2LDIzNiAxMjgsMjM2IDEyOCwxNjAgMzIsMjU2IDEyOCwzNTIgDQoJMTI4LDI3NiAyMzYsMjc2IDIzNiwzODQgMTYwLDM4NCAyNTYsNDgwIDM1MiwzODQgMjc1LjgsMzg0IDI3NS40LDI3NS41IDM4NCwyNzUuOCAzODQsMzUyICIvPg0KPC9zdmc+DQo=" />
                    </div>
                )}
                <h4>{panel_title} (ID: {id}) {isDragging && ` (and I am being dragged from ${container.id} now)`}</h4>
                <p>flex: {flex} - order: {order}</p>

                <DashboardItemControls item={this.props.item} container={container} />
            </div>)
        );
    }
}

export default DashboardItem;
