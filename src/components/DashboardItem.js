import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { injectSheet } from '../utils/jss';
import classNames from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';
import { observer } from "mobx-react";
import { Flex } from 'reflexbox';
import { Heading, Text, Space } from 'rebass';
import { LoadingIndicator } from './';
import { DashboardItemControls } from './';
import EditItemModal from './modal/EditItemModal';

const dashboardItemSource = {
    beginDrag(props) {
        return {
            item: props.item,
            oldContainer: props.container
        }
    },
    endDrag(props, monitor, component) {
        console.log(monitor.didDrop());
    }
};

const cardTarget = {
    // @TODO figure out if an item can actually be dropped properly.
    canDrop(props, monitor) {
        return true;
    },

    hover(props, monitor, component) {
        const { item } = monitor.getItem();

        // our hovering targets
        const hoveredItem = props.item;
        const hoveredContainer = props.container;

        const dragId = item.id;
        const hoverId = hoveredItem.id;

        // if we're over the same item, just exit
        if (dragId === hoverId) {
            return;
        }

        // determine mouse position
        const clientOffset = monitor.getClientOffset();

        // bounds for the item were hovering over, and the middle point
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleX = Math.round(hoverBoundingRect.width / 2);
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // @TODO how do we handle the vertical use case?
        // very simple logic to show placeholders to the left or right.

        if (hoveredContainer.layout === 'row') {
            if (clientOffset.x - hoverBoundingRect.left > hoverMiddleX) {
                hoveredContainer.showItemPlaceholder(hoveredItem.order + 1, item);
                return;
            }

            if (clientOffset.x - hoverBoundingRect.left < hoverMiddleX) {
                hoveredContainer.showItemPlaceholder(hoveredItem.order - 1, item);
                return;
            }
        }

        else {
            if (hoverClientY > hoverMiddleY) {
                hoveredContainer.showItemPlaceholder(hoveredItem.order + 1, item);
                return;
            }
            else {
                hoveredContainer.showItemPlaceholder(hoveredItem.order - 1, item);
                return;
            }
        }

    }
};

export const dashboardItemStyles = {
    item: {
        background: '#fff',
        borderRadius: '5px',
        border: '1px solid #ccc',
        flexGrow: '1',
        minHeight: '180px',
        margin: '10px',
        padding: '15px',
        position: 'relative',
        '&:hover $dragHandle': {
            display: 'block'
        }
    },
    dragHandle: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '30px',
        height: '30px',
        cursor: 'pointer'
    },
    dragging: {
        display: 'none'
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
@injectSheet(dashboardItemStyles)
@observer export class DashboardItem extends Component {
    render() {
        const { container, store: { editting }, sheet: { classes } } = this.props;
        const { flex, panel_title, id, loading, order, isEditting } = this.props.item;
        const { isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props;
        const dashboardItemClass = classNames({
            [classes.item]: true,
            [classes.dragging]: isDragging
        });

        const itemStyle = {
            flexGrow: flex,
            order: order
        };

        const thing = {
            height: '100%'
        };

        const isLoading = loading ? <LoadingIndicator /> : '';
        const itemControls = editting ? <DashboardItemControls item={this.props.item} container={container} /> : '';

        return connectDragPreview(
            connectDropTarget(
                <div className={dashboardItemClass} style={itemStyle}>
                    <Flex flexColumn flexAuto style={thing}>
                        { isLoading }
                        {connectDragSource(
                            <div className={classes.dragHandle}>
                                <img alt="drag" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cG9seWdvbiBwb2ludHM9IjQ4MCwyNTYgMzg0LDE2MCAzODQsMjM2IDI3NiwyMzYgMjc2LDEyOCAzNTIsMTI4IDI1NiwzMiAxNjAsMTI4IDIzNiwxMjggMjM2LDIzNiAxMjgsMjM2IDEyOCwxNjAgMzIsMjU2IDEyOCwzNTIgDQoJMTI4LDI3NiAyMzYsMjc2IDIzNiwzODQgMTYwLDM4NCAyNTYsNDgwIDM1MiwzODQgMjc1LjgsMzg0IDI3NS40LDI3NS41IDM4NCwyNzUuOCAzODQsMzUyICIvPg0KPC9zdmc+DQo=" />
                            </div>
                        )}
                        <Heading level={4}>{panel_title} (ID: {id})</Heading>
                        <Text color="grey">flex: {flex} - order: {order}</Text>
                        <Space auto />
                        { itemControls}
                    </Flex>
                    <EditItemModal open={isEditting} item={this.props.item} toggle={() => this.props.item.toggleEditItem()} />

                </div>
            )
        );
    }
}
